const { pool } = require('../config/database');
const nodemailer = require('nodemailer');

// Generate unique enquiry ID
const generateEnquiryId = () => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};

// Email transporter setup
const createEmailTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Submit new enquiry
const submitEnquiry = async (req, res) => {
  const connection = await pool.getConnection();
  
  try {
    await connection.beginTransaction();
    
    const { name, email, phone, city, vehicleType, message } = req.body;
    const enquiryId = generateEnquiryId();
    
    // Insert enquiry into database
    await connection.execute(
      `INSERT INTO enquiries (id, name, email, phone, city, vehicle_type, message, status, submitted_at) 
       VALUES (?, ?, ?, ?, ?, ?, ?, 'new', datetime('now'))`,
      [enquiryId, name, email, phone, city, vehicleType, message || '']
    );

    // Log the enquiry creation
    await connection.execute(
      `INSERT INTO enquiry_logs (enquiry_id, action, new_status, created_at) 
       VALUES (?, 'created', 'new', datetime('now'))`,
      [enquiryId]
    );

    await connection.commit();
    
    // Send notification email to admin (async, don't wait)
    sendAdminNotification({
      enquiryId,
      name,
      email,
      phone,
      city,
      vehicleType,
      message
    }).catch(error => {
      console.error('Failed to send admin notification:', error);
    });

    // Send confirmation email to customer (async, don't wait)
    sendCustomerConfirmation({
      enquiryId,
      name,
      email,
      vehicleType
    }).catch(error => {
      console.error('Failed to send customer confirmation:', error);
    });

    res.status(201).json({
      success: true,
      message: 'Enquiry submitted successfully',
      enquiryId: enquiryId,
      data: {
        id: enquiryId,
        name,
        email,
        phone,
        city,
        vehicleType,
        status: 'new',
        submittedAt: new Date().toISOString()
      }
    });

  } catch (error) {
    await connection.rollback();
    console.error('Submit enquiry error:', error);
    
    res.status(500).json({
      success: false,
      message: 'Failed to submit enquiry. Please try again.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  } finally {
    connection.release();
  }
};

// Get all enquiries (admin only)
const getAllEnquiries = async (req, res) => {
  try {
    const { status, limit = 50, offset = 0, sortBy = 'submitted_at', sortOrder = 'DESC' } = req.query;
    
    let query = `
      SELECT id, name, email, phone, city, vehicle_type, message, status, 
             submitted_at, updated_at 
      FROM enquiries
    `;
    
    const params = [];
    
    if (status && status !== 'all') {
      query += ' WHERE status = ?';
      params.push(status);
    }
    
    // Validate sortBy to prevent SQL injection
    const allowedSortFields = ['submitted_at', 'updated_at', 'name', 'status'];
    const validSortBy = allowedSortFields.includes(sortBy) ? sortBy : 'submitted_at';
    const validSortOrder = sortOrder.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
    
    query += ` ORDER BY ${validSortBy} ${validSortOrder} LIMIT ? OFFSET ?`;
    params.push(parseInt(limit), parseInt(offset));
    
    const [enquiries] = await pool.execute(query, params);
    
    // Get total count
    let countQuery = 'SELECT COUNT(*) as total FROM enquiries';
    const countParams = [];
    
    if (status && status !== 'all') {
      countQuery += ' WHERE status = ?';
      countParams.push(status);
    }
    
    const [countResult] = await pool.execute(countQuery, countParams);
    const total = countResult[0].total;
    
    // Get statistics
    const [stats] = await pool.execute(`
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN status = 'new' THEN 1 ELSE 0 END) as new_count,
        SUM(CASE WHEN status = 'contacted' THEN 1 ELSE 0 END) as contacted_count,
        SUM(CASE WHEN status = 'converted' THEN 1 ELSE 0 END) as converted_count,
        SUM(CASE WHEN status = 'closed' THEN 1 ELSE 0 END) as closed_count
      FROM enquiries
    `);

    res.json({
      success: true,
      data: enquiries,
      pagination: {
        total,
        limit: parseInt(limit),
        offset: parseInt(offset),
        hasMore: (parseInt(offset) + parseInt(limit)) < total
      },
      statistics: {
        total: stats[0].total,
        new: stats[0].new_count,
        contacted: stats[0].contacted_count,
        converted: stats[0].converted_count,
        closed: stats[0].closed_count
      }
    });

  } catch (error) {
    console.error('Get enquiries error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch enquiries',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get single enquiry by ID
const getEnquiryById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const [enquiries] = await pool.execute(
      `SELECT id, name, email, phone, city, vehicle_type, message, status, 
              submitted_at, updated_at 
       FROM enquiries WHERE id = ?`,
      [id]
    );

    if (enquiries.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found'
      });
    }

    // Get enquiry logs
    const [logs] = await pool.execute(
      `SELECT el.*, au.username as admin_username 
       FROM enquiry_logs el 
       LEFT JOIN admin_users au ON el.admin_user_id = au.id 
       WHERE el.enquiry_id = ? 
       ORDER BY el.created_at DESC`,
      [id]
    );

    res.json({
      success: true,
      data: {
        ...enquiries[0],
        logs
      }
    });

  } catch (error) {
    console.error('Get enquiry error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch enquiry',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Update enquiry status
const updateEnquiryStatus = async (req, res) => {
  const connection = await pool.getConnection();
  
  try {
    await connection.beginTransaction();
    
    const { id } = req.params;
    const { status, notes } = req.body;
    
    // Get current enquiry
    const [currentEnquiry] = await connection.execute(
      'SELECT status FROM enquiries WHERE id = ?',
      [id]
    );

    if (currentEnquiry.length === 0) {
      await connection.rollback();
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found'
      });
    }

    const oldStatus = currentEnquiry[0].status;
    
    // Update enquiry status
    await connection.execute(
      'UPDATE enquiries SET status = ?, updated_at = datetime("now") WHERE id = ?',
      [status, id]
    );

    // Log the status change
    await connection.execute(
      `INSERT INTO enquiry_logs (enquiry_id, action, old_status, new_status, admin_user_id, notes, created_at) 
       VALUES (?, 'status_changed', ?, ?, ?, ?, datetime('now'))`,
      [id, oldStatus, status, req.user.id, notes || '']
    );

    await connection.commit();

    res.json({
      success: true,
      message: 'Enquiry status updated successfully',
      data: {
        id,
        oldStatus,
        newStatus: status,
        updatedBy: req.user.username,
        updatedAt: new Date().toISOString()
      }
    });

  } catch (error) {
    await connection.rollback();
    console.error('Update enquiry status error:', error);
    
    res.status(500).json({
      success: false,
      message: 'Failed to update enquiry status',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  } finally {
    connection.release();
  }
};

// Delete enquiry
const deleteEnquiry = async (req, res) => {
  const connection = await pool.getConnection();
  
  try {
    await connection.beginTransaction();
    
    const { id } = req.params;
    
    // Check if enquiry exists
    const [enquiry] = await connection.execute(
      'SELECT id FROM enquiries WHERE id = ?',
      [id]
    );

    if (enquiry.length === 0) {
      await connection.rollback();
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found'
      });
    }

    // Log the deletion
    await connection.execute(
      `INSERT INTO enquiry_logs (enquiry_id, action, admin_user_id, notes, created_at) 
       VALUES (?, 'deleted', ?, 'Enquiry deleted by admin', datetime('now'))`,
      [id, req.user.id]
    );

    // Delete enquiry (logs will be cascade deleted)
    await connection.execute('DELETE FROM enquiries WHERE id = ?', [id]);

    await connection.commit();

    res.json({
      success: true,
      message: 'Enquiry deleted successfully',
      data: {
        id,
        deletedBy: req.user.username,
        deletedAt: new Date().toISOString()
      }
    });

  } catch (error) {
    await connection.rollback();
    console.error('Delete enquiry error:', error);
    
    res.status(500).json({
      success: false,
      message: 'Failed to delete enquiry',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  } finally {
    connection.release();
  }
};

// Send admin notification email
const sendAdminNotification = async (enquiryData) => {
  try {
    const transporter = createEmailTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `New Enquiry - ${enquiryData.name} (${enquiryData.vehicleType})`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #E4002B; color: white; padding: 20px; text-align: center;">
            <h1>New Enquiry Received</h1>
            <p>Kanade Honda Digital Showroom</p>
          </div>
          
          <div style="padding: 20px; background-color: #f9f9f9;">
            <h2>Customer Details:</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Enquiry ID:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${enquiryData.enquiryId}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Name:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${enquiryData.name}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Email:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${enquiryData.email}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Phone:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${enquiryData.phone}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>City:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${enquiryData.city}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Vehicle Type:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${enquiryData.vehicleType}</td></tr>
            </table>
            
            ${enquiryData.message ? `
              <h3>Message:</h3>
              <p style="background: white; padding: 15px; border-left: 4px solid #E4002B;">${enquiryData.message}</p>
            ` : ''}
            
            <div style="margin-top: 20px; text-align: center;">
              <a href="${process.env.FRONTEND_URL}/#/admin" style="background-color: #E4002B; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px;">View in Admin Dashboard</a>
            </div>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Admin notification email sent');
  } catch (error) {
    console.error('❌ Failed to send admin notification:', error);
  }
};

// Send customer confirmation email
const sendCustomerConfirmation = async (enquiryData) => {
  try {
    const transporter = createEmailTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: enquiryData.email,
      subject: 'Thank you for your enquiry - Kanade Honda',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #E4002B; color: white; padding: 20px; text-align: center;">
            <h1>Thank You for Your Enquiry</h1>
            <p>Kanade Honda - The Power of Dreams</p>
          </div>
          
          <div style="padding: 20px;">
            <p>Dear ${enquiryData.name},</p>
            
            <p>Thank you for your interest in our ${enquiryData.vehicleType}s. We have received your enquiry and our team will contact you soon.</p>
            
            <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #E4002B; margin: 20px 0;">
              <p><strong>Enquiry ID:</strong> ${enquiryData.enquiryId}</p>
              <p><strong>Vehicle Type:</strong> ${enquiryData.vehicleType}</p>
              <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
            </div>
            
            <p>Our team will contact you within 24 hours to discuss your requirements and schedule a test ride.</p>
            
            <div style="margin-top: 30px; padding: 20px; background-color: #f0f0f0; border-radius: 8px;">
              <h3>Contact Information:</h3>
              <p>📞 Phone: ${process.env.ADMIN_PHONE}</p>
              <p>📧 Email: ${process.env.ADMIN_EMAIL}</p>
              <p>🕒 Business Hours: Mon-Sat 9:00 AM - 7:00 PM</p>
            </div>
            
            <p style="margin-top: 20px;">Best regards,<br>Team Kanade Honda</p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Customer confirmation email sent');
  } catch (error) {
    console.error('❌ Failed to send customer confirmation:', error);
  }
};

module.exports = {
  submitEnquiry,
  getAllEnquiries,
  getEnquiryById,
  updateEnquiryStatus,
  deleteEnquiry
};
const express = require('express');
const { body, validationResult } = require('express-validator');
const Enquiry = require('../models/Enquiry');
const auth = require('../middleware/auth');

const router = express.Router();

// Validation rules for enquiry
const enquiryValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('phone')
    .matches(/^[\+]?[1-9][\d]{0,15}$/)
    .withMessage('Please provide a valid phone number'),
  body('city')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('City must be between 2 and 50 characters'),
  body('vehicleType')
    .isIn(['scooter', 'motorcycle', 'ev'])
    .withMessage('Vehicle type must be scooter, motorcycle, or ev'),
  body('message')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Message cannot exceed 1000 characters')
];

// @route   POST /api/enquiries
// @desc    Submit a new enquiry
// @access  Public
router.post('/', enquiryValidation, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { name, email, phone, city, vehicleType, message } = req.body;

    // Check for duplicate enquiry (same email within last 24 hours)
    const existingEnquiry = await Enquiry.findOne({
      email: email,
      submittedAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }
    });

    if (existingEnquiry) {
      return res.status(409).json({
        success: false,
        message: 'An enquiry with this email was already submitted in the last 24 hours'
      });
    }

    // Create new enquiry
    const enquiry = new Enquiry({
      name,
      email,
      phone,
      city,
      vehicleType,
      message,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });

    await enquiry.save();

    res.status(201).json({
      success: true,
      message: 'Enquiry submitted successfully',
      data: {
        id: enquiry._id,
        submittedAt: enquiry.submittedAt
      }
    });

  } catch (error) {
    console.error('Error submitting enquiry:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    });
  }
});

// @route   GET /api/enquiries
// @desc    Get all enquiries (Admin only)
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const { status, page = 1, limit = 10, sort = '-submittedAt' } = req.query;
    
    // Build filter
    const filter = {};
    if (status && status !== 'all') {
      filter.status = status;
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Get enquiries with pagination
    const enquiries = await Enquiry.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .select('-ipAddress -userAgent'); // Hide sensitive data

    // Get total count for pagination
    const total = await Enquiry.countDocuments(filter);

    res.json({
      success: true,
      data: {
        enquiries,
        pagination: {
          current: parseInt(page),
          pages: Math.ceil(total / limit),
          total,
          hasNext: page * limit < total,
          hasPrev: page > 1
        }
      }
    });

  } catch (error) {
    console.error('Error fetching enquiries:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching enquiries'
    });
  }
});

// @route   GET /api/enquiries/stats
// @desc    Get enquiry statistics (Admin only)
// @access  Private
router.get('/stats', auth, async (req, res) => {
  try {
    const stats = await Enquiry.getStats();
    
    res.json({
      success: true,
      data: stats
    });

  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching statistics'
    });
  }
});

// @route   GET /api/enquiries/:id
// @desc    Get single enquiry (Admin only)
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);
    
    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found'
      });
    }

    res.json({
      success: true,
      data: enquiry
    });

  } catch (error) {
    console.error('Error fetching enquiry:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching enquiry'
    });
  }
});

// @route   PUT /api/enquiries/:id/status
// @desc    Update enquiry status (Admin only)
// @access  Private
router.put('/:id/status', auth, [
  body('status')
    .isIn(['new', 'contacted', 'converted', 'closed'])
    .withMessage('Invalid status')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const enquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status, updatedAt: Date.now() },
      { new: true }
    );

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found'
      });
    }

    res.json({
      success: true,
      message: 'Status updated successfully',
      data: enquiry
    });

  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating status'
    });
  }
});

// @route   DELETE /api/enquiries/:id
// @desc    Delete enquiry (Admin only)
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndDelete(req.params.id);

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found'
      });
    }

    res.json({
      success: true,
      message: 'Enquiry deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting enquiry:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting enquiry'
    });
  }
});

// @route   DELETE /api/enquiries
// @desc    Delete all enquiries (Admin only)
// @access  Private
router.delete('/', auth, async (req, res) => {
  try {
    const result = await Enquiry.deleteMany({});

    res.json({
      success: true,
      message: `${result.deletedCount} enquiries deleted successfully`
    });

  } catch (error) {
    console.error('Error deleting all enquiries:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting enquiries'
    });
  }
});

module.exports = router;
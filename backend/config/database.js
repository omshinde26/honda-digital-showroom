require('dotenv').config();

// Use SQLite for development, MySQL for production
const isDevelopment = process.env.NODE_ENV === 'development';

let dbModule;
if (isDevelopment) {
  dbModule = require('./database-dev');
} else {
  const mysql = require('mysql2/promise');
  
  // Database configuration
  const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'kanade_honda',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    acquireTimeout: 60000,
    timeout: 60000,
    reconnect: true
  };

  // Create connection pool
  const pool = mysql.createPool(dbConfig);
  
  dbModule = { pool };
}

const pool = dbModule.pool;

// Test database connection
const testConnection = async () => {
  if (isDevelopment) {
    return await dbModule.testConnection();
  }
  
  try {
    const connection = await pool.getConnection();
    console.log('✅ Database connected successfully');
    connection.release();
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    return false;
  }
};

// Initialize database tables
const initializeTables = async () => {
  if (isDevelopment) {
    return await dbModule.initializeTables();
  }
  
  try {
    const connection = await pool.getConnection();
    
    // Create enquiries table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS enquiries (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        city VARCHAR(50) NOT NULL,
        vehicle_type ENUM('scooter', 'motorcycle', 'ev') NOT NULL,
        message TEXT,
        status ENUM('new', 'contacted', 'converted', 'closed') DEFAULT 'new',
        submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_status (status),
        INDEX idx_submitted_at (submitted_at),
        INDEX idx_email (email)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    // Create admin_users table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS admin_users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        role ENUM('admin', 'manager') DEFAULT 'admin',
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_login TIMESTAMP NULL,
        INDEX idx_username (username),
        INDEX idx_email (email)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    // Create enquiry_logs table for tracking changes
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS enquiry_logs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        enquiry_id VARCHAR(50) NOT NULL,
        action ENUM('created', 'status_changed', 'updated', 'deleted') NOT NULL,
        old_status VARCHAR(20),
        new_status VARCHAR(20),
        admin_user_id INT,
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (enquiry_id) REFERENCES enquiries(id) ON DELETE CASCADE,
        FOREIGN KEY (admin_user_id) REFERENCES admin_users(id) ON DELETE SET NULL,
        INDEX idx_enquiry_id (enquiry_id),
        INDEX idx_created_at (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    connection.release();
    console.log('✅ Database tables initialized successfully');
    return true;
  } catch (error) {
    console.error('❌ Database initialization failed:', error.message);
    return false;
  }
};

module.exports = {
  pool,
  testConnection,
  initializeTables
};
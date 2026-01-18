const sqlite3 = require('sqlite3').verbose();
const path = require('path');
require('dotenv').config();

// SQLite database for development
const dbPath = path.join(__dirname, '..', 'kanade_honda_dev.db');
let db = null;

// Initialize SQLite connection
const initializeDatabase = () => {
  return new Promise((resolve, reject) => {
    db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error('❌ SQLite connection failed:', err.message);
        reject(err);
      } else {
        console.log('✅ SQLite database connected successfully');
        resolve(db);
      }
    });
  });
};

// Test database connection
const testConnection = async () => {
  try {
    if (!db) {
      await initializeDatabase();
    }
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    return false;
  }
};

// Initialize database tables
const initializeTables = async () => {
  try {
    if (!db) {
      await initializeDatabase();
    }

    // Create enquiries table
    await new Promise((resolve, reject) => {
      db.run(`
        CREATE TABLE IF NOT EXISTS enquiries (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          phone TEXT NOT NULL,
          city TEXT NOT NULL,
          vehicle_type TEXT NOT NULL CHECK (vehicle_type IN ('scooter', 'motorcycle', 'ev')),
          message TEXT,
          status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'converted', 'closed')),
          submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    // Create admin_users table
    await new Promise((resolve, reject) => {
      db.run(`
        CREATE TABLE IF NOT EXISTS admin_users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT UNIQUE NOT NULL,
          email TEXT UNIQUE NOT NULL,
          password_hash TEXT NOT NULL,
          role TEXT DEFAULT 'admin' CHECK (role IN ('admin', 'manager')),
          is_active BOOLEAN DEFAULT TRUE,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          last_login DATETIME
        )
      `, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    // Create enquiry_logs table
    await new Promise((resolve, reject) => {
      db.run(`
        CREATE TABLE IF NOT EXISTS enquiry_logs (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          enquiry_id TEXT NOT NULL,
          action TEXT NOT NULL CHECK (action IN ('created', 'status_changed', 'updated', 'deleted')),
          old_status TEXT,
          new_status TEXT,
          admin_user_id INTEGER,
          notes TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (enquiry_id) REFERENCES enquiries(id) ON DELETE CASCADE,
          FOREIGN KEY (admin_user_id) REFERENCES admin_users(id) ON DELETE SET NULL
        )
      `, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    console.log('✅ SQLite database tables initialized successfully');
    return true;
  } catch (error) {
    console.error('❌ Database initialization failed:', error.message);
    return false;
  }
};

// Execute query (for compatibility with MySQL pool.execute)
const execute = (query, params = []) => {
  return new Promise((resolve, reject) => {
    if (query.trim().toUpperCase().startsWith('SELECT')) {
      db.all(query, params, (err, rows) => {
        if (err) reject(err);
        else resolve([rows]);
      });
    } else {
      db.run(query, params, function(err) {
        if (err) reject(err);
        else resolve([{ insertId: this.lastID, affectedRows: this.changes }]);
      });
    }
  });
};

// Mock pool object for compatibility
const pool = {
  execute,
  getConnection: () => ({
    execute,
    beginTransaction: () => Promise.resolve(),
    commit: () => Promise.resolve(),
    rollback: () => Promise.resolve(),
    release: () => {}
  })
};

module.exports = {
  pool,
  testConnection,
  initializeTables,
  db: () => db
};
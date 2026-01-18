const { testConnection, initializeTables } = require('./config/database');
const { createAdminUser } = require('./controllers/authController');
require('dotenv').config();

const setupDatabase = async () => {
  console.log('🚀 Kanade Honda Backend Setup (Development)');
  console.log('============================================\n');

  try {
    // Test database connection
    console.log('1. Testing database connection...');
    const dbConnected = await testConnection();
    
    if (!dbConnected) {
      console.error('❌ Database connection failed!');
      process.exit(1);
    }

    // Initialize tables
    console.log('2. Initializing database tables...');
    const tablesInitialized = await initializeTables();
    
    if (!tablesInitialized) {
      console.error('❌ Failed to initialize database tables!');
      process.exit(1);
    }

    // Create default admin user
    console.log('3. Creating default admin user...');
    
    const result = await createAdminUser('admin', 'admin@kanadehonda.com', 'kanade123', 'admin');
    
    if (result.success) {
      console.log('\n✅ Setup completed successfully!');
      console.log('================================');
      console.log(`Admin User Created:`);
      console.log(`- Username: admin`);
      console.log(`- Password: kanade123`);
      console.log(`- Email: admin@kanadehonda.com`);
      console.log(`- Role: admin`);
      
      console.log('\n🚀 You can now start the server with:');
      console.log('npm start');
      
      console.log('\n📚 API Endpoints:');
      console.log(`- Health: http://localhost:${process.env.PORT || 5000}/health`);
      console.log(`- API Docs: http://localhost:${process.env.PORT || 5000}/api`);
      console.log(`- Submit Enquiry: POST http://localhost:${process.env.PORT || 5000}/api/enquiries`);
      console.log(`- Admin Login: POST http://localhost:${process.env.PORT || 5000}/api/auth/login`);
      
    } else {
      if (result.error.includes('UNIQUE constraint failed')) {
        console.log('✅ Admin user already exists!');
        console.log('- Username: admin');
        console.log('- Password: kanade123');
      } else {
        console.error('❌ Failed to create admin user:', result.error);
      }
    }

  } catch (error) {
    console.error('❌ Setup failed:', error.message);
  }
  
  process.exit(0);
};

// Run setup
setupDatabase();
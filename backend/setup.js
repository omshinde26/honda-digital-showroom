const readline = require('readline');
const { testConnection, initializeTables } = require('./config/database');
const { createAdminUser } = require('./controllers/authController');
require('dotenv').config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
};

const setupDatabase = async () => {
  console.log('🚀 Kanade Honda Backend Setup');
  console.log('================================\n');

  try {
    // Test database connection
    console.log('1. Testing database connection...');
    const dbConnected = await testConnection();
    
    if (!dbConnected) {
      console.error('❌ Database connection failed!');
      console.log('\nPlease check your database configuration in .env file:');
      console.log('- DB_HOST');
      console.log('- DB_USER');
      console.log('- DB_PASSWORD');
      console.log('- DB_NAME');
      process.exit(1);
    }

    // Initialize tables
    console.log('2. Initializing database tables...');
    const tablesInitialized = await initializeTables();
    
    if (!tablesInitialized) {
      console.error('❌ Failed to initialize database tables!');
      process.exit(1);
    }

    // Create admin user
    console.log('3. Setting up admin user...\n');
    
    const username = await question('Enter admin username: ');
    const email = await question('Enter admin email: ');
    
    let password;
    let confirmPassword;
    
    do {
      password = await question('Enter admin password (min 6 characters): ');
      if (password.length < 6) {
        console.log('❌ Password must be at least 6 characters long!');
        continue;
      }
      
      confirmPassword = await question('Confirm admin password: ');
      if (password !== confirmPassword) {
        console.log('❌ Passwords do not match!');
      }
    } while (password !== confirmPassword || password.length < 6);

    const result = await createAdminUser(username, email, password, 'admin');
    
    if (result.success) {
      console.log('\n✅ Setup completed successfully!');
      console.log('================================');
      console.log(`Admin User Created:`);
      console.log(`- Username: ${result.username}`);
      console.log(`- Email: ${result.email}`);
      console.log(`- Role: ${result.role}`);
      console.log(`- User ID: ${result.userId}`);
      
      console.log('\n🚀 You can now start the server with:');
      console.log('npm start');
      
      console.log('\n📚 API Endpoints:');
      console.log(`- Health: http://localhost:${process.env.PORT || 5000}/health`);
      console.log(`- API Docs: http://localhost:${process.env.PORT || 5000}/api`);
      console.log(`- Submit Enquiry: POST http://localhost:${process.env.PORT || 5000}/api/enquiries`);
      console.log(`- Admin Login: POST http://localhost:${process.env.PORT || 5000}/api/auth/login`);
      
    } else {
      console.error('❌ Failed to create admin user:', result.error);
      
      if (result.error.includes('Duplicate entry')) {
        console.log('\n💡 Admin user might already exist. Try different username/email.');
      }
    }

  } catch (error) {
    console.error('❌ Setup failed:', error.message);
  } finally {
    rl.close();
    process.exit(0);
  }
};

// Run setup
setupDatabase();
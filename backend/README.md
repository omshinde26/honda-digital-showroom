# Kanade Honda Backend API

Complete backend API for the Kanade Honda Digital Showroom application with MySQL database integration, authentication, and email notifications.

## 🚀 Features

- **Enquiry Management**: Submit, view, update, and delete customer enquiries
- **Admin Authentication**: JWT-based authentication with role-based access
- **Email Notifications**: Automatic emails to admin and customers
- **Rate Limiting**: Protection against spam and abuse
- **Input Validation**: Comprehensive validation for all inputs
- **Database Logging**: Complete audit trail of all enquiry changes
- **Security**: Helmet, CORS, and other security best practices

## 📋 Prerequisites

- Node.js (v16 or higher)
- MySQL (v8.0 or higher)
- Gmail account (for email notifications)

## 🛠️ Installation

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Database Setup
Create a MySQL database:
```sql
CREATE DATABASE kanade_honda CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 3. Environment Configuration
Copy the example environment file:
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
# Server Configuration
PORT=5000
NODE_ENV=production

# Database Configuration
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=kanade_honda

# JWT Secret (Generate a strong secret)
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Admin Configuration
ADMIN_EMAIL=admin@kanadehonda.com
ADMIN_PHONE=+91-98765-43210

# Frontend URL
FRONTEND_URL=http://localhost:3001
```

### 4. Gmail App Password Setup
1. Enable 2-Factor Authentication on your Gmail account
2. Go to Google Account settings → Security → App passwords
3. Generate an app password for "Mail"
4. Use this app password in `EMAIL_PASS`

### 5. Database Setup & Admin User Creation
```bash
npm run setup
```

This will:
- Create all necessary database tables
- Create your first admin user
- Verify database connection

### 6. Start the Server
```bash
# Production
npm start

# Development (with auto-restart)
npm run dev
```

## 📚 API Endpoints

### Public Endpoints

#### Submit Enquiry
```http
POST /api/enquiries
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91-9876543210",
  "city": "Mumbai",
  "vehicleType": "scooter",
  "message": "Interested in Activa 125"
}
```

#### Health Check
```http
GET /health
```

#### API Documentation
```http
GET /api
```

### Admin Endpoints (Require Authentication)

#### Admin Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "your_password"
}
```

#### Get All Enquiries
```http
GET /api/enquiries
Authorization: Bearer <jwt_token>

Query Parameters:
- status: new|contacted|converted|closed|all
- limit: number (default: 50)
- offset: number (default: 0)
- sortBy: submitted_at|updated_at|name|status
- sortOrder: ASC|DESC
```

#### Get Single Enquiry
```http
GET /api/enquiries/:id
Authorization: Bearer <jwt_token>
```

#### Update Enquiry Status
```http
PATCH /api/enquiries/:id/status
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "status": "contacted",
  "notes": "Called customer, interested in test ride"
}
```

#### Delete Enquiry
```http
DELETE /api/enquiries/:id
Authorization: Bearer <jwt_token>
```

#### Get Admin Profile
```http
GET /api/auth/profile
Authorization: Bearer <jwt_token>
```

## 🗄️ Database Schema

### enquiries
- `id` (VARCHAR(50), PRIMARY KEY)
- `name` (VARCHAR(100), NOT NULL)
- `email` (VARCHAR(100), NOT NULL)
- `phone` (VARCHAR(20), NOT NULL)
- `city` (VARCHAR(50), NOT NULL)
- `vehicle_type` (ENUM: scooter, motorcycle, ev)
- `message` (TEXT)
- `status` (ENUM: new, contacted, converted, closed)
- `submitted_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### admin_users
- `id` (INT, AUTO_INCREMENT, PRIMARY KEY)
- `username` (VARCHAR(50), UNIQUE)
- `email` (VARCHAR(100), UNIQUE)
- `password_hash` (VARCHAR(255))
- `role` (ENUM: admin, manager)
- `is_active` (BOOLEAN)
- `created_at` (TIMESTAMP)
- `last_login` (TIMESTAMP)

### enquiry_logs
- `id` (INT, AUTO_INCREMENT, PRIMARY KEY)
- `enquiry_id` (VARCHAR(50), FOREIGN KEY)
- `action` (ENUM: created, status_changed, updated, deleted)
- `old_status` (VARCHAR(20))
- `new_status` (VARCHAR(20))
- `admin_user_id` (INT, FOREIGN KEY)
- `notes` (TEXT)
- `created_at` (TIMESTAMP)

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Rate Limiting**: Prevents spam and abuse
- **Input Validation**: Comprehensive validation using express-validator
- **SQL Injection Protection**: Parameterized queries
- **CORS Configuration**: Controlled cross-origin access
- **Helmet**: Security headers
- **Password Hashing**: bcrypt with salt rounds

## 📧 Email Features

### Admin Notifications
- Instant email when new enquiry is submitted
- Contains all customer details
- Direct link to admin dashboard

### Customer Confirmations
- Thank you email with enquiry ID
- Contact information
- Professional branding

## 🚀 Production Deployment

### Environment Variables
Set `NODE_ENV=production` and ensure all environment variables are configured.

### Database
- Use a production MySQL server
- Enable SSL connections
- Regular backups

### Security
- Use strong JWT secrets
- Enable HTTPS
- Configure firewall rules
- Regular security updates

### Monitoring
- Set up logging
- Monitor API performance
- Database monitoring
- Email delivery monitoring

## 🔧 Troubleshooting

### Database Connection Issues
1. Verify MySQL is running
2. Check database credentials in `.env`
3. Ensure database exists
4. Check firewall settings

### Email Issues
1. Verify Gmail app password
2. Check SMTP settings
3. Ensure 2FA is enabled on Gmail
4. Test with a simple email client

### Authentication Issues
1. Check JWT secret configuration
2. Verify token expiration
3. Check user permissions

## 📞 Support

For technical support or questions:
- Email: tech@kanadehonda.com
- Phone: +91-98765-43210

## 📄 License

This project is proprietary software for Kanade Honda Digital Showroom.
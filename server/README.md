# Kanade Honda Backend API

A robust Node.js + Express + MongoDB backend for the Kanade Honda Digital Showroom.

## 🚀 Features

- **Enquiry Management**: Submit, view, update, and delete customer enquiries
- **Admin Authentication**: Secure JWT-based admin login with rate limiting
- **Data Validation**: Comprehensive input validation and sanitization
- **Security**: Helmet, CORS, rate limiting, and password hashing
- **Database**: MongoDB with Mongoose ODM
- **Error Handling**: Comprehensive error handling and logging

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

## 🛠️ Installation

### 1. Install Dependencies
```bash
cd server
npm install
```

### 2. Setup Environment Variables
```bash
# Copy the example environment file
cp .env.example .env

# Edit .env with your configuration
nano .env
```

### 3. Configure MongoDB

**Option A: Local MongoDB**
```bash
# Install MongoDB locally
# Ubuntu/Debian:
sudo apt-get install mongodb

# macOS:
brew install mongodb-community

# Windows: Download from https://www.mongodb.com/try/download/community

# Start MongoDB service
sudo systemctl start mongodb  # Linux
brew services start mongodb-community  # macOS
```

**Option B: MongoDB Atlas (Cloud)**
1. Go to https://www.mongodb.com/atlas
2. Create a free account
3. Create a new cluster
4. Get connection string and update MONGODB_URI in .env

### 4. Start the Server

**Development Mode:**
```bash
npm run dev
```

**Production Mode:**
```bash
npm start
```

## 🔧 Environment Variables

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/kanade-honda

# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Secret (Change this!)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=kanade123

# CORS Settings
FRONTEND_URL=http://localhost:3001
```

## 📡 API Endpoints

### Public Endpoints

#### Submit Enquiry
```http
POST /api/enquiries
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 9876543210",
  "city": "Mumbai",
  "vehicleType": "scooter",
  "message": "Interested in Activa 125"
}
```

#### Admin Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "kanade123"
}
```

### Protected Endpoints (Require Authentication)

#### Get All Enquiries
```http
GET /api/enquiries
Authorization: Bearer <jwt_token>
```

#### Get Enquiry Statistics
```http
GET /api/enquiries/stats
Authorization: Bearer <jwt_token>
```

#### Update Enquiry Status
```http
PUT /api/enquiries/:id/status
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "status": "contacted"
}
```

#### Delete Enquiry
```http
DELETE /api/enquiries/:id
Authorization: Bearer <jwt_token>
```

## 🔒 Security Features

- **Rate Limiting**: 100 requests per 15 minutes (5 for auth endpoints)
- **Password Hashing**: bcrypt with salt rounds
- **JWT Authentication**: Secure token-based authentication
- **Account Locking**: Automatic lockout after 5 failed login attempts
- **Input Validation**: Comprehensive validation using express-validator
- **CORS Protection**: Configured for specific frontend origin
- **Helmet**: Security headers protection

## 📊 Database Schema

### Enquiry Model
```javascript
{
  name: String (required, max 100 chars),
  email: String (required, valid email),
  phone: String (required, valid phone),
  city: String (required, max 50 chars),
  vehicleType: String (enum: scooter, motorcycle, ev),
  message: String (optional, max 1000 chars),
  status: String (enum: new, contacted, converted, closed),
  submittedAt: Date,
  updatedAt: Date,
  source: String (default: 'website'),
  ipAddress: String,
  userAgent: String
}
```

### Admin Model
```javascript
{
  username: String (required, unique, 3-30 chars),
  password: String (required, hashed, min 6 chars),
  role: String (enum: admin, manager),
  isActive: Boolean (default: true),
  lastLogin: Date,
  loginAttempts: Number,
  lockUntil: Date
}
```

## 🚀 Deployment

### Using PM2 (Recommended)
```bash
# Install PM2 globally
npm install -g pm2

# Start the application
pm2 start server.js --name "kanade-honda-api"

# Save PM2 configuration
pm2 save
pm2 startup
```

### Using Docker
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

## 📝 Logs

The server logs important events:
- Database connections
- Authentication attempts
- Error messages
- API requests (in development)

## 🔧 Troubleshooting

### Common Issues

1. **MongoDB Connection Failed**
   - Check if MongoDB is running
   - Verify MONGODB_URI in .env
   - Check network connectivity for Atlas

2. **Port Already in Use**
   - Change PORT in .env file
   - Kill existing process: `lsof -ti:5000 | xargs kill -9`

3. **JWT Token Issues**
   - Ensure JWT_SECRET is set in .env
   - Check token expiration (24h default)

4. **CORS Errors**
   - Verify FRONTEND_URL in .env matches your frontend URL
   - Check if credentials are included in frontend requests

## 📞 Support

For issues or questions:
- Check the logs for error messages
- Verify environment variables
- Ensure MongoDB is running
- Check network connectivity

## 🔄 Updates

To update the backend:
```bash
git pull origin main
npm install
npm run dev
```
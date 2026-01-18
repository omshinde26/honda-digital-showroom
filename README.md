# Kanade Honda Digital Showroom

A modern, responsive digital showroom for Kanade Honda featuring vehicle catalogs, enquiry management, and admin dashboard.

## 🚀 Features

### Frontend
- **Modern React Application**: Built with React 19, TypeScript, and Vite
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Vehicle Catalog**: Interactive product pages with image galleries and specifications
- **EMI Calculator**: Smooth drag-based loan calculator
- **Enquiry System**: Customer enquiry form with real-time validation
- **Admin Dashboard**: Complete enquiry management system

### Backend (Production Ready)
- **Node.js API**: RESTful API with Express.js
- **MySQL Database**: Persistent data storage with proper schema
- **JWT Authentication**: Secure admin authentication
- **Email Notifications**: Automatic emails to admin and customers
- **Rate Limiting**: Protection against spam and abuse
- **Input Validation**: Comprehensive validation for all inputs

## 🛠️ Quick Start

### Frontend Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:3001`

### Backend Setup (Production)
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env with your configuration
# - Database credentials
# - JWT secret
# - Email settings

# Setup database and admin user
npm run setup

# Start production server
npm start
```

## 📋 Environment Configuration

### Frontend (.env.local)
```env
# For development (uses localStorage)
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENV=development

# For production (uses backend API)
REACT_APP_API_URL=https://your-backend-domain.com/api
REACT_APP_ENV=production
```

### Backend (.env)
```env
# Server Configuration
PORT=5000
NODE_ENV=production

# Database Configuration
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=kanade_honda

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key

# Email Configuration (Gmail)
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

## 🔄 Development vs Production

### Development Mode
- Uses localStorage for enquiry storage
- No backend required for basic functionality
- Perfect for frontend development and testing
- Admin dashboard shows enquiries from same browser

### Production Mode
- Uses MySQL database via REST API
- Customer enquiries reach admin from any device
- Email notifications to admin and customers
- Secure JWT authentication
- Rate limiting and input validation

## 📚 API Endpoints

### Public Endpoints
- `POST /api/enquiries` - Submit customer enquiry
- `GET /health` - Health check

### Admin Endpoints (Require Authentication)
- `POST /api/auth/login` - Admin login
- `GET /api/enquiries` - Get all enquiries
- `PATCH /api/enquiries/:id/status` - Update enquiry status
- `DELETE /api/enquiries/:id` - Delete enquiry

## 🚀 Deployment

### Frontend Deployment
1. Build the application: `npm run build`
2. Deploy the `dist` folder to your hosting service
3. Update `REACT_APP_API_URL` to your backend URL

### Backend Deployment
1. Set up MySQL database
2. Configure environment variables
3. Run `npm run setup` to initialize database
4. Deploy to your server (PM2, Docker, etc.)
5. Set up SSL certificate for HTTPS

## 🔒 Admin Access

**Default Credentials:**
- Username: `admin`
- Password: `kanade123`

**Admin Dashboard Features:**
- View all customer enquiries
- Update enquiry status (New → Contacted → Converted → Closed)
- Filter enquiries by status
- Delete enquiries
- Real-time statistics
- Customer contact integration (call/email)

## 📱 Vehicle Catalog

### Available Vehicles
- **Activa 125**: 6 color variants with specifications
- **CB 200X**: Motorcycle with detailed specs
- **Hornet 2.0**: Sport motorcycle

### Features
- High-resolution image galleries
- Color variant selector
- Detailed specifications with tabs
- EMI calculator
- Enquiry form integration

## 🛡️ Security Features

- JWT-based authentication
- Rate limiting (100 requests per 15 minutes)
- Input validation and sanitization
- SQL injection protection
- CORS configuration
- Helmet security headers
- Password hashing with bcrypt

## 📧 Email Integration

### Admin Notifications
- Instant email when new enquiry submitted
- Complete customer details
- Direct link to admin dashboard

### Customer Confirmations
- Thank you email with enquiry ID
- Contact information
- Professional Honda branding

## 🔧 Troubleshooting

### Common Issues
1. **Port 3001 already in use**: Change port in `vite.config.ts`
2. **Database connection failed**: Check MySQL credentials in `.env`
3. **Email not sending**: Verify Gmail app password setup
4. **API calls failing**: Ensure backend is running and CORS is configured

### Development Tips
- Use browser dev tools to check localStorage for enquiries
- Check console for API call logs
- Verify environment variables are loaded correctly

## 📞 Support

For technical support:
- Email: tech@kanadehonda.com
- Phone: +91-98765-43210

## 📄 License

This project is proprietary software for Kanade Honda Digital Showroom.

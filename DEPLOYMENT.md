# Kanade Honda - Production Deployment Guide

This guide walks you through deploying the Kanade Honda Digital Showroom to production with a complete backend API.

## 🎯 Overview

The application consists of:
- **Frontend**: React application (served as static files)
- **Backend**: Node.js API server with MySQL database
- **Database**: MySQL with enquiries, admin users, and audit logs
- **Email**: Gmail SMTP for notifications

## 📋 Prerequisites

- **Server**: Linux server (Ubuntu 20.04+ recommended)
- **Node.js**: Version 16 or higher
- **MySQL**: Version 8.0 or higher
- **Domain**: For HTTPS and professional email
- **Gmail Account**: For email notifications

## 🚀 Step-by-Step Deployment

### 1. Server Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install MySQL
sudo apt install mysql-server -y
sudo mysql_secure_installation

# Install PM2 for process management
sudo npm install -g pm2

# Install Nginx for reverse proxy
sudo apt install nginx -y
```

### 2. Database Setup

```bash
# Login to MySQL
sudo mysql -u root -p

# Create database and user
CREATE DATABASE kanade_honda CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'kanade_user'@'localhost' IDENTIFIED BY 'your_secure_password';
GRANT ALL PRIVILEGES ON kanade_honda.* TO 'kanade_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### 3. Backend Deployment

```bash
# Clone or upload your project
cd /var/www/
sudo mkdir kanade-honda
sudo chown $USER:$USER kanade-honda
cd kanade-honda

# Upload backend files
# (Use scp, git, or your preferred method)

cd backend

# Install dependencies
npm install --production

# Create production environment file
cp .env.example .env
nano .env
```

**Backend .env Configuration:**
```env
# Server Configuration
PORT=5000
NODE_ENV=production

# Database Configuration
DB_HOST=localhost
DB_USER=kanade_user
DB_PASSWORD=your_secure_password
DB_NAME=kanade_honda

# JWT Secret (Generate a strong secret)
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-business-email@gmail.com
EMAIL_PASS=your-gmail-app-password

# Admin Configuration
ADMIN_EMAIL=admin@kanadehonda.com
ADMIN_PHONE=+91-98765-43210

# Frontend URL
FRONTEND_URL=https://your-domain.com
```

```bash
# Setup database tables and admin user
npm run setup

# Test the server
npm start

# If working, stop and setup PM2
# Ctrl+C to stop

# Start with PM2
pm2 start server.js --name "kanade-honda-api"
pm2 save
pm2 startup
```

### 4. Frontend Deployment

```bash
# In your local development environment
# Update environment variables
cp .env.example .env.local
nano .env.local
```

**Frontend .env.local:**
```env
REACT_APP_API_URL=https://your-domain.com/api
REACT_APP_ENV=production
```

```bash
# Build for production
npm run build

# Upload dist folder to server
scp -r dist/* user@your-server:/var/www/kanade-honda/frontend/
```

### 5. Nginx Configuration

```bash
# Create Nginx configuration
sudo nano /etc/nginx/sites-available/kanade-honda
```

**Nginx Configuration:**
```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    
    # Frontend (React app)
    location / {
        root /var/www/kanade-honda/frontend;
        index index.html;
        try_files $uri $uri/ /index.html;
        
        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
    
    # Backend API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
    
    # Health check
    location /health {
        proxy_pass http://localhost:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
# Enable the site
sudo ln -s /etc/nginx/sites-available/kanade-honda /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 6. SSL Certificate (Let's Encrypt)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Test auto-renewal
sudo certbot renew --dry-run
```

### 7. Gmail App Password Setup

1. **Enable 2-Factor Authentication** on your Gmail account
2. Go to **Google Account Settings** → **Security** → **App passwords**
3. Generate an app password for "Mail"
4. Use this password in your backend `.env` file as `EMAIL_PASS`

### 8. Firewall Configuration

```bash
# Configure UFW firewall
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

## 🔍 Testing Your Deployment

### 1. Test Backend API
```bash
# Health check
curl https://your-domain.com/health

# API documentation
curl https://your-domain.com/api
```

### 2. Test Frontend
- Visit `https://your-domain.com`
- Submit a test enquiry
- Check if admin receives email notification

### 3. Test Admin Dashboard
- Go to `https://your-domain.com/#/admin`
- Login with: `admin` / `kanade123`
- Verify enquiries appear in dashboard

## 📊 Monitoring & Maintenance

### PM2 Process Management
```bash
# Check status
pm2 status

# View logs
pm2 logs kanade-honda-api

# Restart application
pm2 restart kanade-honda-api

# Monitor resources
pm2 monit
```

### Database Backup
```bash
# Create backup script
nano /home/ubuntu/backup-db.sh
```

**Backup Script:**
```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
mysqldump -u kanade_user -p'your_secure_password' kanade_honda > /home/ubuntu/backups/kanade_honda_$DATE.sql
find /home/ubuntu/backups/ -name "kanade_honda_*.sql" -mtime +7 -delete
```

```bash
# Make executable and schedule
chmod +x /home/ubuntu/backup-db.sh
mkdir -p /home/ubuntu/backups

# Add to crontab (daily backup at 2 AM)
crontab -e
# Add: 0 2 * * * /home/ubuntu/backup-db.sh
```

### Log Rotation
```bash
# Configure log rotation for PM2
sudo nano /etc/logrotate.d/pm2
```

**Log Rotation Config:**
```
/home/ubuntu/.pm2/logs/*.log {
    daily
    missingok
    rotate 7
    compress
    notifempty
    create 0644 ubuntu ubuntu
    postrotate
        pm2 reloadLogs
    endscript
}
```

## 🚨 Troubleshooting

### Common Issues

1. **API calls failing**
   - Check PM2 status: `pm2 status`
   - Check logs: `pm2 logs kanade-honda-api`
   - Verify database connection

2. **Email not sending**
   - Verify Gmail app password
   - Check SMTP settings in `.env`
   - Test with a simple email client

3. **Database connection errors**
   - Check MySQL service: `sudo systemctl status mysql`
   - Verify credentials in `.env`
   - Check firewall rules

4. **Frontend not loading**
   - Check Nginx configuration: `sudo nginx -t`
   - Verify file permissions
   - Check browser console for errors

### Performance Optimization

1. **Enable Gzip compression** in Nginx
2. **Set up CDN** for static assets
3. **Database indexing** for better query performance
4. **Redis caching** for frequently accessed data

## 🔒 Security Checklist

- [ ] Strong JWT secret (64+ characters)
- [ ] Secure database passwords
- [ ] SSL certificate installed
- [ ] Firewall configured
- [ ] Regular security updates
- [ ] Database backups automated
- [ ] Rate limiting enabled
- [ ] Input validation in place

## 📞 Support

If you encounter issues during deployment:
- Email: tech@kanadehonda.com
- Phone: +91-98765-43210

## 🎉 Go Live!

Once everything is tested and working:
1. Update DNS records to point to your server
2. Test from different devices and networks
3. Monitor logs for the first few days
4. Set up monitoring alerts (optional)

Your Kanade Honda Digital Showroom is now live! 🚀
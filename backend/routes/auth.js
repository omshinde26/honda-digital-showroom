const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');

const {
  login,
  getProfile,
  changePassword
} = require('../controllers/authController');

const { verifyToken } = require('../middleware/auth');
const {
  validateLogin,
  handleValidationErrors
} = require('../middleware/validation');

// Rate limiting for login attempts
const loginLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 login attempts per windowMs
  message: {
    success: false,
    message: 'Too many login attempts. Please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Public routes
router.post('/login', 
  loginLimit,
  validateLogin,
  handleValidationErrors,
  login
);

// Protected routes
router.get('/profile', 
  verifyToken,
  getProfile
);

router.post('/change-password', 
  verifyToken,
  changePassword
);

module.exports = router;
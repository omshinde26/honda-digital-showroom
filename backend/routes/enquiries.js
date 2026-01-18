const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');

const {
  submitEnquiry,
  getAllEnquiries,
  getEnquiryById,
  updateEnquiryStatus,
  deleteEnquiry
} = require('../controllers/enquiryController');

const { verifyToken, requireAdmin } = require('../middleware/auth');
const {
  validateEnquiry,
  validateStatusUpdate,
  handleValidationErrors
} = require('../middleware/validation');

// Rate limiting for enquiry submission
const enquirySubmissionLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 enquiry submissions per windowMs
  message: {
    success: false,
    message: 'Too many enquiry submissions. Please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Public routes
router.post('/', 
  enquirySubmissionLimit,
  validateEnquiry,
  handleValidationErrors,
  submitEnquiry
);

// Protected admin routes
router.get('/', 
  verifyToken,
  requireAdmin,
  getAllEnquiries
);

router.get('/:id', 
  verifyToken,
  requireAdmin,
  getEnquiryById
);

router.patch('/:id/status', 
  verifyToken,
  requireAdmin,
  validateStatusUpdate,
  handleValidationErrors,
  updateEnquiryStatus
);

router.delete('/:id', 
  verifyToken,
  requireAdmin,
  deleteEnquiry
);

module.exports = router;
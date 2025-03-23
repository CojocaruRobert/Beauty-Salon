const express = require('express');
const router = express.Router();
const { 
  register, 
  login, 
  getMe, 
  changePassword 
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');

// Routes
router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.post('/password', protect, changePassword);

module.exports = router; 
const express = require('express');
const router = express.Router();

// Import route modules
const authRoutes = require('./auth');
const serviceRoutes = require('./services');
const appointmentRoutes = require('./appointments');

// Register routes
router.use('/auth', authRoutes);
router.use('/services', serviceRoutes);
router.use('/appointments', appointmentRoutes);

module.exports = router;

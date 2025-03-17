const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const { authenticate, authorize } = require('../middleware/auth');

// Get user's appointments (authenticated)
router.get('/my-appointments', authenticate, appointmentController.getUserAppointments);

// Create appointment (client only)
router.post('/', authenticate, authorize('client'), appointmentController.createAppointment);

// Update appointment status (authenticated)
router.patch('/:id/status', authenticate, appointmentController.updateAppointmentStatus);

// Get available time slots (public)
router.get('/available-slots', appointmentController.getAvailableTimeSlots);

module.exports = router;

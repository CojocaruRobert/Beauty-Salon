const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');
const { authenticate, authorize } = require('../middleware/auth');

// Get all services (public)
router.get('/', serviceController.getAllServices);

// Get service by ID (public)
router.get('/:id', serviceController.getServiceById);

// Admin routes (protected)
// Create service
router.post('/', authenticate, authorize('admin'), serviceController.createService);

// Update service
router.put('/:id', authenticate, authorize('admin'), serviceController.updateService);

// Delete service
router.delete('/:id', authenticate, authorize('admin'), serviceController.deleteService);

module.exports = router;

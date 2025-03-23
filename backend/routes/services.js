const express = require('express');
const router = express.Router();
const { 
  getServices, 
  getService, 
  createService, 
  updateService, 
  deleteService,
  getCategories 
} = require('../controllers/serviceController');
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.get('/', getServices);
router.get('/categories', getCategories);
router.get('/:id', getService);

// Admin only routes
router.post('/', protect, authorize('admin'), createService);
router.put('/:id', protect, authorize('admin'), updateService);
router.delete('/:id', protect, authorize('admin'), deleteService);

module.exports = router; 
const { Service } = require('../models');
const redisClient = require('../config/redis');

// Get all services
exports.getAllServices = async (req, res) => {
  try {
    // Check cache first
    const cachedServices = await redisClient.get('services:all');
    
    if (cachedServices) {
      return res.json(JSON.parse(cachedServices));
    }
    
    // If not in cache, get from database
    const services = await Service.findAll();
    
    // Store in cache for 1 hour
    await redisClient.set('services:all', JSON.stringify(services), {
      EX: 3600
    });
    
    res.json(services);
  } catch (err) {
    console.error('Get services error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get service by ID
exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);
    
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    
    res.json(service);
  } catch (err) {
    console.error('Get service error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create service (admin only)
exports.createService = async (req, res) => {
  try {
    const { name, description, duration, price, category, imageUrl } = req.body;
    
    const service = await Service.create({
      name,
      description,
      duration,
      price,
      category,
      imageUrl
    });
    
    // Invalidate cache
    await redisClient.del('services:all');
    
    res.status(201).json(service);
  } catch (err) {
    console.error('Create service error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update service (admin only)
exports.updateService = async (req, res) => {
  try {
    const { name, description, duration, price, category, imageUrl } = req.body;
    
    const service = await Service.findByPk(req.params.id);
    
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    
    // Update service
    await service.update({
      name: name || service.name,
      description: description || service.description,
      duration: duration || service.duration,
      price: price || service.price,
      category: category || service.category,
      imageUrl: imageUrl || service.imageUrl
    });
    
    // Invalidate cache
    await redisClient.del('services:all');
    
    res.json(service);
  } catch (err) {
    console.error('Update service error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete service (admin only)
exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);
    
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    
    await service.destroy();
    
    // Invalidate cache
    await redisClient.del('services:all');
    
    res.json({ message: 'Service deleted successfully' });
  } catch (err) {
    console.error('Delete service error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

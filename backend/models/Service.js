const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a service name'],
    trim: true,
    maxlength: [100, 'Service name cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide a service description'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Please provide a service price'],
    min: [0, 'Price cannot be negative']
  },
  duration: {
    type: Number,
    required: [true, 'Please provide a service duration'],
    min: [1, 'Duration must be at least 1 minute']
  },
  category: {
    type: String,
    required: [true, 'Please provide a service category'],
    enum: ['Hair', 'Nails', 'Facial', 'Massage', 'Makeup', 'Other'],
    trim: true
  },
  image: {
    type: String,
    default: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9'
  },
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Create index for searching
ServiceSchema.index({ name: 'text', description: 'text', category: 'text' });

module.exports = mongoose.model('Service', ServiceSchema); 
const mongoose = require('mongoose');

const StylistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide stylist name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  specialties: {
    type: [String],
    required: [true, 'Please provide at least one specialty'],
    enum: ['Hair', 'Nails', 'Facial', 'Massage', 'Makeup', 'Other']
  },
  bio: {
    type: String,
    required: [true, 'Please provide stylist bio'],
    trim: true,
    maxlength: [1000, 'Bio cannot be more than 1000 characters']
  },
  image: {
    type: String,
    default: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f'
  },
  available: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Create index for searching
StylistSchema.index({ name: 'text', bio: 'text' });

module.exports = mongoose.model('Stylist', StylistSchema); 
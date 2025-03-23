const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required for booking an appointment']
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: [true, 'Service is required for booking an appointment']
  },
  stylist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Stylist',
    required: [true, 'Stylist is required for booking an appointment']
  },
  date: {
    type: Date,
    required: [true, 'Date and time are required for booking an appointment'],
    min: [Date.now, 'Appointment date cannot be in the past']
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  },
  notes: {
    type: String,
    trim: true,
    maxlength: [500, 'Notes cannot be more than 500 characters']
  }
}, {
  timestamps: true
});

// Ensure we don't double book appointments
AppointmentSchema.index({ stylist: 1, date: 1 }, { unique: true });

// Create compound index for faster queries
AppointmentSchema.index({ user: 1, status: 1, date: 1 });

module.exports = mongoose.model('Appointment', AppointmentSchema); 
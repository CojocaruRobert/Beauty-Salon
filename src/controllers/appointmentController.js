const { Appointment, User, Service } = require('../models');
const { Op } = require('sequelize');

// Get appointments for current user
exports.getUserAppointments = async (req, res) => {
  try {
    const userId = req.user.id;
    const role = req.user.role;
    
    let appointments;
    
    if (role === 'client') {
      // Clients see their own appointments
      appointments = await Appointment.findAll({
        where: { clientId: userId },
        include: [
          { 
            model: User, 
            as: 'staff', 
            attributes: ['id', 'name', 'email', 'phone'] 
          },
          { 
            model: Service,
            attributes: ['id', 'name', 'duration', 'price', 'category']
          }
        ],
        order: [['date', 'ASC'], ['startTime', 'ASC']]
      });
    } else if (role === 'staff') {
      // Staff see appointments assigned to them
      appointments = await Appointment.findAll({
        where: { staffId: userId },
        include: [
          { 
            model: User, 
            as: 'client', 
            attributes: ['id', 'name', 'email', 'phone'] 
          },
          { 
            model: Service,
            attributes: ['id', 'name', 'duration', 'price', 'category']
          }
        ],
        order: [['date', 'ASC'], ['startTime', 'ASC']]
      });
    } else if (role === 'admin') {
      // Admins see all appointments
      appointments = await Appointment.findAll({
        include: [
          { 
            model: User, 
            as: 'client', 
            attributes: ['id', 'name', 'email', 'phone'] 
          },
          { 
            model: User, 
            as: 'staff', 
            attributes: ['id', 'name', 'email', 'phone'] 
          },
          { 
            model: Service,
            attributes: ['id', 'name', 'duration', 'price', 'category']
          }
        ],
        order: [['date', 'ASC'], ['startTime', 'ASC']]
      });
    }
    
    res.json(appointments);
  } catch (err) {
    console.error('Get appointments error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new appointment
exports.createAppointment = async (req, res) => {
  try {
    const { serviceId, staffId, date, startTime, notes } = req.body;
    const clientId = req.user.id;
    
    // Validate service
    const service = await Service.findByPk(serviceId);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    
    // Validate staff
    const staff = await User.findOne({
      where: { id: staffId, role: 'staff' }
    });
    if (!staff) {
      return res.status(404).json({ message: 'Staff member not found' });
    }
    
    // Calculate end time based on service duration
    // Convert startTime (e.g. "14:00:00") to minutes since midnight
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const startMinutes = startHour * 60 + startMinute;
    
    // Add service duration to get end minutes
    const endMinutes = startMinutes + service.duration;
    
    // Convert back to time format
    const endHour = Math.floor(endMinutes / 60);
    const endMinute = endMinutes % 60;
    const endTime = `${endHour.toString().padStart(2, '0')}:${endMinute.toString().padStart(2, '0')}:00`;
    
    // Check for conflicts
    const hasConflict = await Appointment.checkForConflicts(staffId, date, startTime, endTime);
    if (hasConflict) {
      return res.status(400).json({ message: 'The selected time slot is not available' });
    }
    
    // Create appointment
    const appointment = await Appointment.create({
      clientId,
      staffId,
      serviceId,
      date,
      startTime,
      endTime,
      notes,
      status: 'scheduled'
    });
    
    // Return the appointment with related data
    const newAppointment = await Appointment.findByPk(appointment.id, {
      include: [
        { 
          model: User, 
          as: 'staff', 
          attributes: ['id', 'name', 'email', 'phone'] 
        },
        { 
          model: Service,
          attributes: ['id', 'name', 'duration', 'price', 'category']
        }
      ]
    });
    
    res.status(201).json(newAppointment);
  } catch (err) {
    console.error('Create appointment error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update appointment status
exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    // Validate status
    const validStatuses = ['scheduled', 'confirmed', 'cancelled', 'completed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    
    // Find appointment
    const appointment = await Appointment.findByPk(id);
    
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    
    // Check authorization
    const userId = req.user.id;
    const userRole = req.user.role;
    
    // Only client who owns the appointment, staff assigned to it, or admin can update
    if (userRole === 'client' && appointment.clientId !== userId) {
      return res.status(403).json({ message: 'Not authorized to update this appointment' });
    }
    
    if (userRole === 'staff' && appointment.staffId !== userId) {
      return res.status(403).json({ message: 'Not authorized to update this appointment' });
    }
    
    // If client is cancelling, check if it's not too late (e.g., within 24 hours)
    if (userRole === 'client' && status === 'cancelled') {
      const appointmentDate = new Date(`${appointment.date}T${appointment.startTime}`);
      const now = new Date();
      const hoursUntilAppointment = (appointmentDate - now) / (1000 * 60 * 60);
      
      if (hoursUntilAppointment < 24) {
        return res.status(400).json({ 
          message: 'Cannot cancel appointment less than 24 hours in advance'
        });
      }
    }
    
    // Update appointment status
    await appointment.update({ status });
    
    res.json({ 
      message: `Appointment status updated to ${status}`,
      appointment
    });
  } catch (err) {
    console.error('Update appointment status error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get available time slots for a service and staff member on a specific date
exports.getAvailableTimeSlots = async (req, res) => {
  try {
    const { serviceId, staffId, date } = req.query;
    
    // Validate service
    const service = await Service.findByPk(serviceId);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    
    // Validate staff
    const staff = await User.findOne({
      where: { id: staffId, role: 'staff' }
    });
    if (!staff) {
      return res.status(404).json({ message: 'Staff member not found' });
    }
    
    // Get all appointments for the staff on that date
    const appointments = await Appointment.findAll({
      where: {
        staffId,
        date,
        status: {
          [Op.in]: ['scheduled', 'confirmed']
        }
      },
      order: [['startTime', 'ASC']]
    });
    
    // Define business hours (e.g., 9 AM to 5 PM)
    const businessStart = 9 * 60; // 9 AM in minutes
    const businessEnd = 17 * 60;  // 5 PM in minutes
    
    // Calculate time slots (e.g., every 30 minutes)
    const slotInterval = 30; // minutes
    const serviceDuration = service.duration;
    
    // Generate all possible time slots
    const timeSlots = [];
    for (let time = businessStart; time <= businessEnd - serviceDuration; time += slotInterval) {
      const hour = Math.floor(time / 60);
      const minute = time % 60;
      const startTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:00`;
      
      // Calculate end time
      const endMinutes = time + serviceDuration;
      const endHour = Math.floor(endMinutes / 60);
      const endMinute = endMinutes % 60;
      const endTime = `${endHour.toString().padStart(2, '0')}:${endMinute.toString().padStart(2, '0')}:00`;
      
      // Check if this slot conflicts with any existing appointment
      const hasConflict = appointments.some(appt => {
        // Convert appointment times to minutes for easier comparison
        const [apptStartHour, apptStartMin] = appt.startTime.split(':').map(Number);
        const [apptEndHour, apptEndMin] = appt.endTime.split(':').map(Number);
        
        const apptStart = apptStartHour * 60 + apptStartMin;
        const apptEnd = apptEndHour * 60 + apptEndMin;
        
        // Check for overlap
        return (time < apptEnd) && (time + serviceDuration > apptStart);
      });
      
      if (!hasConflict) {
        timeSlots.push({
          startTime,
          endTime
        });
      }
    }
    
    res.json(timeSlots);
  } catch (err) {
    console.error('Get available time slots error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

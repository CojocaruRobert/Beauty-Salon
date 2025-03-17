const User = require('./User');
const Service = require('./Service');
const Appointment = require('./Appointment');

// Define relationships
Appointment.belongsTo(User, { as: 'client', foreignKey: 'clientId' });
Appointment.belongsTo(User, { as: 'staff', foreignKey: 'staffId' });
Appointment.belongsTo(Service, { foreignKey: 'serviceId' });

User.hasMany(Appointment, { as: 'clientAppointments', foreignKey: 'clientId' });
User.hasMany(Appointment, { as: 'staffAppointments', foreignKey: 'staffId' });
Service.hasMany(Appointment, { foreignKey: 'serviceId' });

module.exports = {
  User,
  Service,
  Appointment
};

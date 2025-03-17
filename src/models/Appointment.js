const { DataTypes, Op } = require('sequelize');
const sequelize = require('../config/database');

const Appointment = sequelize.define('Appointment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  startTime: {
    type: DataTypes.TIME,
    allowNull: false
  },
  endTime: {
    type: DataTypes.TIME,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('scheduled', 'confirmed', 'cancelled', 'completed'),
    defaultValue: 'scheduled'
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  timestamps: true
});

// Class method to check for conflicts
Appointment.checkForConflicts = async function(staffId, date, startTime, endTime, excludeId = null) {
  const whereClause = {
    staffId,
    date,
    status: ['scheduled', 'confirmed'],
    [Op.or]: [
      {
        startTime: { [Op.lt]: endTime },
        endTime: { [Op.gt]: startTime }
      }
    ]
  };
  
  // Exclude current appointment if updating
  if (excludeId) {
    whereClause.id = { [Op.ne]: excludeId };
  }
  
  const conflicts = await this.findAll({ where: whereClause });
  return conflicts.length > 0;
};

module.exports = Appointment;

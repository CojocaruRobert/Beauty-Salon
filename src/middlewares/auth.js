const jwt = require('jsonwebtoken');
const { User, Role } = require('../models');
const config = require('../config');

exports.authenticate = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }
    
    const token = authHeader.split(' ')[1];
    
    // Verify token
    const decoded = jwt.verify(token, config.jwt.secret);
    
    // Find user
    const user = await User.findByPk(decoded.id, {
      include: Role
    });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Add user to request
    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
    console.error('Authentication error:', error);
    res.status(500).json({ message: 'Error authenticating user', error: error.message });
  }
};

exports.isAdmin = (req, res, next) => {
  if (!req.user || !req.user.Role || req.user.Role.name !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};

exports.isStaff = (req, res, next) => {
  if (!req.user || !req.user.Role || (req.user.Role.name !== 'staff' && req.user.Role.name !== 'admin')) {
    return res.status(403).json({ message: 'Staff access required' });
  }
  next();
};
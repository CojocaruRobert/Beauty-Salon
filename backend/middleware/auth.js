const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Protect routes - authenticate the user based on JWT token
 */
exports.protect = async (req, res, next) => {
  let token;
  
  // Get token from Authorization header (format: "Bearer token")
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  
  // Check if token exists
  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: 'Authentication failed. Please log in to access this resource.' 
    });
  }
  
  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach user to request
    req.user = await User.findById(decoded.id);
    
    if (!req.user) {
      return res.status(401).json({ 
        success: false, 
        message: 'User not found with this token. Please log in again.' 
      });
    }
    
    next();
  } catch (error) {
    return res.status(401).json({ 
      success: false, 
      message: 'Authentication failed. Invalid token.' 
    });
  }
};

/**
 * Authorize roles - restrict access to certain roles
 */
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        success: false, 
        message: `User role '${req.user.role}' is not authorized to access this resource` 
      });
    }
    next();
  };
}; 
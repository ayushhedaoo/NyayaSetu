const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

// Protect routes — validate JWT and attach user to request
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Only accept Bearer tokens from Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user and exclude password from result
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      // Token is valid but user was deleted
      return res.status(401).json({
        success: false,
        message: 'User no longer exists',
      });
    }

    req.user = user;
    next();
  } catch (error) {
    // Distinguish expired vs invalid tokens
    const message =
      error.name === 'TokenExpiredError'
        ? 'Session expired, please log in again'
        : 'Not authorized to access this route';

    return res.status(401).json({ success: false, message });
  }
});

// Admin-only guard — must be used after protect
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  return res.status(403).json({
    success: false,
    message: 'Access denied. Admin privileges required.',
  });
};

module.exports = { protect, admin };

const User = require('../models/User');
const jwt = require('jsonwebtoken');

const validate = async (decoded, request, h) => {
  // Check if the user exists in the database
  const user = await User.findById(decoded._id);

  if (!user) {
    return { isValid: false };
  }

  return { isValid: true };
};

// Generate token
const generateToken = (id) => {
  return jwt.sign({ _id: id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = { validate, generateToken };

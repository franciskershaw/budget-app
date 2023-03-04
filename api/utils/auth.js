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

const checkResourceUser = async (resourceId, userId, Model) => {
  const resource = await Model.findById(resourceId);
  return resource && resource.user.toString() === userId;
};

// Generate token
const generateToken = (id) => {
  return jwt.sign({ _id: id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

const generateAccessToken = (id) => {
  return jwt.sign({ _id: id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '15m',
  });
};

const generateRefreshToken = (id) => {
  return jwt.sign({ _id: id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = {
  validate,
  checkResourceUser,
  generateToken,
  generateAccessToken,
  generateRefreshToken,
};

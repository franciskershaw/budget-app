const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const verifyAsync = promisify(jwt.verify);

const validate = async (decoded, request) => {
  try {
    const user = await User.findById(decoded._id);
    if (!user) {
      return { isValid: false };
    }

    // Check if the user has a valid refresh token
    const cookies = request.state;
    const refreshToken = cookies?.refreshToken;
    if (!refreshToken) {
      return { isValid: false };
    }

    const decodedRefreshToken = await verifyAsync(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    if (decoded.jti !== decodedRefreshToken.jti) {
      return { isValid: false };
    }
    // If all checks pass, the token is valid
    return { isValid: true };
  } catch (error) {
    return { isValid: false };
  }
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

const bcrypt = require('bcryptjs');
const Joi = require('joi');
const Boom = require('@hapi/boom');
const User = require('../models/User');
const {
  generateToken,
  generateAccessToken,
  generateRefreshToken,
} = require('../utils/auth');

const registerUser = async (request, h) => {
  // Define Joi schema for request validation
  const schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  });

  // Validate request payload against schema
  const { error } = schema.validate(request.payload);

  if (error) {
    throw Boom.badRequest(error.details[0].message);
  }

  const userExists = await User.findOne({ email: request.payload.email });
  if (userExists) {
    throw Boom.conflict('User already exists');
  }

  try {
    const { username, email, password } = request.payload;
    // Hash the password before storing it in the database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // Add refresh token to browser cookie
    const refreshToken = generateRefreshToken(user._id);
    h.state('refreshToken', refreshToken, {
      encoding: 'none',
      path: '/',
      ttl: 30 * 24 * 60 * 60 * 1000, // 30 days
      isSecure: process.env.NODE_ENV === 'production',
      isHttpOnly: true,
      clearInvalid: true,
      strictHeader: true,
    });

    return h
      .response({
        userInfo: {
          username: user.username,
          email: user.email,
          spaces: user.spaces,
        },
        token: generateAccessToken(user._id),
      })
      .code(201);
  } catch (error) {
    throw Boom.internal('An internal server error occurred', error);
  }
};

const loginUser = async (request, h) => {
  // Validate the user's credentials
  const { email, password } = request.payload;
  const user = await User.findOne({ email });

  if (!user) {
    throw Boom.badRequest('Invalid email or password');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw Boom.badRequest('Invalid email or password');
  }

  // Add refresh token to browser cookie
  const refreshToken = generateRefreshToken(user._id);
  h.state('refreshToken', refreshToken, {
    encoding: 'none',
    path: '/',
    ttl: 30 * 24 * 60 * 60 * 1000, // 30 days
    isSecure: process.env.NODE_ENV === 'production',
    isHttpOnly: true,
    clearInvalid: true,
    strictHeader: true,
  });

  return {
    userInfo: {
      username: user.username,
      email: user.email,
      spaces: user.spaces,
    },
    token: generateAccessToken(user._id),
  };
};

module.exports = {
  registerUser,
  loginUser,
};

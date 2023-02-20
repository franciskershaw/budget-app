const bcrypt = require('bcryptjs');
const Joi = require('joi');
const Boom = require('@hapi/boom');
const User = require('../models/User');
const { generateToken } = require('../utils/auth');

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
    throw Boom.badRequest('User already exists');
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

    return h.response({ user, token: generateToken(user._id) }).code(201);
  } catch (error) {
    throw Boom.internal('An internal server error occurred', error);
  }
};

const loginUser = async (request, h) => {
  // Validate the user's credentials
  const { email, password } = request.payload;
  const user = await User.findOne({ email });

  if (!user) {
    throw Boom.unauthorized('Invalid email or password');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw Boom.unauthorized('Invalid email or password');
  }

  // Generate a token and return it to the user
  const token = generateToken(user._id);

  return { user, token };
};

module.exports = {
  registerUser,
  loginUser,
};

const bcrypt = require('bcryptjs');
const Joi = require('joi');
const User = require('../models/User');

async function registerUserHandler(request, h) {
	console.log(h)
  // Define Joi schema for request validation
  const schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  });

  // Validate request payload against schema
  const { error, value } = schema.validate(request.payload);

  if (error) {
    return h.response(error.details[0]).code(400);
  }

  try {
    const { username, email, password } = request.payload;

    // Hash the password before storing it in the database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ username, email, password: hashedPassword });
    console.log(user);
    return h.response(user).code(201);
  } catch (error) {
    return h.response(error).code(500);
  }
}

module.exports = {
  registerUserHandler,
};

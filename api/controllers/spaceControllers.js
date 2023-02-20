const Joi = require('joi');
const Boom = require('@hapi/boom');
const Space = require('../models/Space');

const addSpaceHandler = async (request, h) => {
  try {
    // Validate the request payload with Joi
    const schema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
    });
    const { error, value } = schema.validate(request.payload);
		console.log({error, value})
    if (error) {
      throw Boom.badRequest(error.details[0].message);
    }

    // Get the user ID from the authenticated request credentials
    const userId = request.auth.credentials._id;
		console.log(userId)

    // Create a new space with the validated name and user ID
    const space = new Space({
      name: value.name,
      user: userId,
    });
    await space.save();
    // Return a success response with the new space object
    return h.response(space).code(201);
  } catch (error) {
		console.log(error)
    throw Boom.boomify(error);
  }
};

module.exports = { addSpaceHandler };

const Joi = require('joi');
const Boom = require('@hapi/boom');
const Space = require('../models/Space');
const { checkResourceUser } = require('../utils/auth');

const addSpaceHandler = async (request, h) => {
  try {
    // Validate the request payload with Joi
    const schema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
    });
    const { error, value } = schema.validate(request.payload);

    if (error) {
      throw Boom.badRequest(error.details[0].message);
    }

    // Get the user ID from the authenticated request credentials
    const userId = request.auth.credentials._id;

    // Create a new space with the validated name and user ID
    const space = new Space({
      name: value.name,
      user: userId,
    });
    await space.save();
    // Return a success response with the new space object
    return h.response(space).code(201);
  } catch (error) {
    console.log(error);
    throw Boom.boomify(error);
  }
};

const updateSpaceHandler = async (request, h) => {
  try {
    const spaceId = request.params.spaceId;
    const userId = request.auth.credentials._id;

    // Validate the request payload with Joi
    const schema = Joi.object({
      name: Joi.string().min(3).max(30),
    });
    const { error, value } = schema.validate(request.payload);
    if (error) {
      throw Boom.badRequest(error.details[0].message);
    }

		// Find the existing space in the database by ID
    const space = await Space.findById(spaceId);
    if (!space) {
      throw Boom.notFound(`Space with id ${spaceId} not found`);
    }

    // Check if the user is the owner of the space being updated
    const isOwner = await checkResourceUser(spaceId, userId, Space);
    if (!isOwner) {
      throw Boom.unauthorized('You are not authorized to update this space');
    }

    // Update the name of the space with the new value, if present
    if (value.name) {
      space.name = value.name;
    }

    // Save the updated space to the database
    await space.save();

    // Return a success response with the updated space object
    return h.response(space).code(200);
  } catch (error) {
		// console.log(error)
    throw Boom.boomify(error);
  }
};

module.exports = { addSpaceHandler, updateSpaceHandler };

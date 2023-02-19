const { registerUserHandler } = require('../controllers/userControllers');

const userRoutes = [
  {
    method: 'POST',
    path: '/api/users',
    handler: registerUserHandler,
    options: {
      auth: false,
    },
  },
];

module.exports = userRoutes;

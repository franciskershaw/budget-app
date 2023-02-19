const { registerUserHandler } = require('../controllers/userControllers');

const userRoutes = [
  {
    method: 'POST',
    path: '/api/users',
    handler: registerUserHandler,
  },
];

module.exports = userRoutes;

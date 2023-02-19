const {
  registerUserHandler,
  loginUserHandler,
} = require('../controllers/userControllers');

const userRoutes = [
  {
    method: 'POST',
    path: '/api/users',
    handler: registerUserHandler,
    options: {
      auth: false,
    },
  },
  {
    method: 'POST',
    path: '/api/users/login',
    handler: loginUserHandler,
    options: {
      auth: false,
    },
  },
];

module.exports = userRoutes;

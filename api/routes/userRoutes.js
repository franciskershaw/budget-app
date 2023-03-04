const {
  registerUser,
  loginUser,
  checkRefreshToken,
} = require('../handlers/userHandlers');

const userRoutes = [
  {
    method: 'POST',
    path: '/api/users/',
    handler: registerUser,
    options: {
      auth: false,
    },
  },
  {
    method: 'POST',
    path: '/api/users/login',
    handler: loginUser,
    options: {
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/api/users/refreshToken',
    handler: checkRefreshToken,
    options: {
      auth: false,
    },
  },
];

module.exports = userRoutes;

const {
  registerUser,
  loginUser,
  logoutUser,
  checkRefreshToken,
  // getUser,
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
    method: 'POST',
    path: '/api/users/logout',
    handler: logoutUser,
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
  // TODO LATER - getUser handler and endpoint
  // {
  //   method: 'GET',
  //   path: '/api/users/{userId}',
  //   handler: getUser,
  // },
];

module.exports = userRoutes;

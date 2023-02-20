const { addSpaceHandler } = require('../controllers/spaceControllers');

const spaceRoutes = [
  {
    method: 'POST',
    path: '/api/spaces',
    handler: addSpaceHandler,
  },
];

module.exports = spaceRoutes;

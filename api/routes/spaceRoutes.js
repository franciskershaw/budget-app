const {
  addSpaceHandler,
  updateSpaceHandler,
} = require('../controllers/spaceControllers');

const spaceRoutes = [
  {
    method: 'POST',
    path: '/api/spaces',
    handler: addSpaceHandler,
  },
  {
    method: 'PUT',
    path: '/api/spaces/{spaceId}',
    handler: updateSpaceHandler,
  },
];

module.exports = spaceRoutes;

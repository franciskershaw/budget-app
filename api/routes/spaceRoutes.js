const {
  addSpaceHandler,
  updateSpaceHandler,
	deleteSpaceHandler
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
  {
    method: 'DELETE',
    path: '/api/spaces/{spaceId}',
    handler: deleteSpaceHandler,
  },
];

module.exports = spaceRoutes;

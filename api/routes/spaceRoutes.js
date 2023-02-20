const {
  addSpace,
  updateSpace,
  deleteSpace,
} = require('../handlers/spaceHandlers');

const spaceRoutes = [
  {
    method: 'POST',
    path: '/api/spaces',
    handler: addSpace,
  },
  {
    method: 'PUT',
    path: '/api/spaces/{spaceId}',
    handler: updateSpace,
  },
  {
    method: 'DELETE',
    path: '/api/spaces/{spaceId}',
    handler: deleteSpace,
  },
];

module.exports = spaceRoutes;

'use strict';

const Hapi = require('@hapi/hapi');
const connectDb = require('./config/db');
require('dotenv').config();
require('colors');
const Jwt = require('hapi-auth-jwt2');
const { validate } = require('./utils/auth');

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 5200,
    host: 'localhost',
  });

  // Register plugins
  await server.register(Jwt);

  // Set the jwt authentication strategy
  server.auth.strategy('jwt', 'jwt', {
    key: process.env.JWT_SECRET,
    validate,
    verifyOptions: { algorithms: ['HS256'] },
  });

  // Set the default authentication strategy to jwt
  server.auth.default('jwt');

  // Routes
  server.route(require('./routes/userRoutes'));
  server.route(require('./routes/spaceRoutes'));

  await server.start();
  
  console.log(`Server running in ${process.env.NODE_ENV} mode on ${server.info.uri}`.yellow);
  console.log('-------------------------------------------------------------'.yellow);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

connectDb()
  .then((db) => {
    // Load routes and plugins, and start server
    init();
  })
  .catch((err) => {
    console.error(`Error connecting to MongoDB: ${err.message}`.red.underline.bold);
    process.exit(1);
  });

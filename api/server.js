'use strict';

const Hapi = require('@hapi/hapi');
const connectDb = require('./config/db');
require('dotenv').config();
require('colors');

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 5200,
    host: 'localhost',
  });

  // LATER: Load plugins
  // EXAMPLE: await server.register(require('hapi-auth-jwt2'));

  // LATER: Load routes
  // EXAMPLE: await server.route(require('./routes'));

  await server.start();
  console.log('-----------------------------------------------'.yellow);
  console.log(`Server running in ${process.env.NODE_ENV} mode on ${server.info.uri}`.yellow);
  console.log('-----------------------------------------------'.yellow);
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

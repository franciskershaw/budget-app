const express = require('express');
const connectDb = require('./config/db');
require('dotenv').config();
require('colors');

const PORT = process.env.PORT || 5200;

connectDb();

const app = express();

app.listen(
  PORT,
  console.log('-----------------------------------------------'.yellow),
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.italic
      .yellow
  ),
  console.log('-----------------------------------------------'.yellow)
);

'use strict';

// environmental variables
require('dotenv').config();

// express server
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cors
const cors = require('cors');
app.use(cors());


// middleware
const handle404 = require('../src/middleware/404.js');
const handle500 = require('../src/middleware/500.js');
const logger = require('../src/middleware/logger.js');

// router
const router = require('./auth/router.js');

app.use(logger);
app.use(router);



app.use(handle500);
app.use(handle404);


// port
const PORT = process.env.PORT || 3001;

// test message
app.get('/message', (request, response, next) => {
  let message = [
    { text: 'proof of life message' }
  ];
});


module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, () => {
      console.log(`server is running on port ${PORT}`);
    });
  },
};

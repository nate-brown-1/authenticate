'use strict';

require('dotenv').config();
const PORT = process.env.PORT;

const server = require('./src/server.js');

const { sequelize } = require('./src/auth/models/index.js');

sequelize.sync().then(() => {
  server.start(PORT || 3001);
});

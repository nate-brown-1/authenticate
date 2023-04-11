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

// base64 for encoding/decoding
const base64 = require('base-64');

// bcrypt for hashing passwords
const bcrypt = require('bcrypt');

// port
const port = process.env.PORT || 3002;

// sequelize
const { Sequelize, DataTypes } = require('sequelize');
const SQL_URL = process.env.SQL_URL || 'sqlite:memory:';
const sequelize = new Sequelize(SQL_URL);

const UserModel = sequelize.define('Users', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});


UserModel.beforeCreate(async user => {
  user.password = await bcrypt.hash(user.password, 10);
});


async function basicAuth(request, response, next) {
  // auth stuff here
  console.log(request.headers.authorization);
  if (!request.headers.authorization) {
    response.status(401).send('no auth credentials presented');
    return;
  }
  // check if user exists
  let credentials = base64.decode(request.headers.authorization);
  let userName = credentials.split(':')[0];
  let password = credentials.split(':')[1];

  // query database to find user where userName === username in DB


  let userFromDb = await UserModel.findOne({ where: { username: userName } });
  if (!userFromDb) {
    response.status(401).send('user not found');
    return;
  }
  next();
}


app.post('/signup', async (request, response, next) => {
  let newUser = await UserModel.creat(request.body);
  response.json(newUser);
});


app.use(basicAuth);


app.get('/message', (request, response, next) => {
  let message = [
    { text: 'message goes here' }
  ];
});


sequelize.sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`server is running on port ${port}`);
    });
  }).catch(error => {
    console.error('Could not start server', error.message);
  });

'use strict';

const { sequelize, user } = require('../src/auth/models/index.js');

const supertest = require('supertest');
const { server } = require('../src/server.js');

const bcrypt = require('bcrypt');
const base64 = require('base-64');

const { expect } = require('@jest/globals');

const request = supertest(server);

beforeAll(async () => {
  await sequelize.sync().then();

  let testUser = await user.create({
    username: 'Jack',
    password: 'Brown'
  });

  console.log('you created ' + testUser + ' for testing');

});

afterAll(async () => {
  await sequelize.drop();
});

describe('Test signup and signin', () => {

  test('user can sign up', async () => {

    const mom = { username: 'Mom', password: 'pw' };

    let newUser = await request.post('/signup').send(mom);

    console.log(newUser.res.statusCode);
    expect(newUser.res.statusCode).toEqual(201);
  });

  test('user can sign in', async () => {

    const mompassword = await bcrypt.hash('pw', 10);

    const mom = { username: 'Mom', password: 'pw' };

    let signinUser = await request.post('/signin').auth(mom.username, mom.password);

    console.log(signinUser.res.statusCode);
    expect(signinUser.res.statusCode).toEqual(200);
  });

});

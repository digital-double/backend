const request = require('supertest');
const express = require('express');
const passport = require('passport');
const sessionController = require('../../app/controllers/session.controller');

jest.mock('passport', () => ({
  authenticate: jest.fn(() => (req, res, next) => {
    req.user = {
      id: 1,
      username: 'testuser',
      stripSensitive: jest.fn(() => ({ id: 1, username: 'testuser' })),
    };
    next();
  }),
}));

const app = express();
app.use(express.json());
app.post('/login', passport.authenticate('local'), sessionController.login);

describe('POST /login', () => {
  it('should log in the user and return a success message', async () => {
    const response = await request(app).post('/login').send({
      username: 'testuser',
      password: 'password',
    });
    expect(response.status).toBe(200);
    expect(response.body.message).toEqual('Successfully logged in');
  });
});

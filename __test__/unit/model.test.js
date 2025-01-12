const request = require('supertest');
const express = require('express');
const userController = require('../../app/controllers/user.controller');
const { User } = require('../../app/models');
const { createStripeCustomer, createStripeAccount } = require('../../app/controllers/stripe.controller');

// Mock dependencies
jest.mock('../../app/models', () => ({
  User: {
    findByLogin: jest.fn(),
    findByToken: jest.fn(),
    createNewUser: jest.fn(),
  },
}));

jest.mock('../../app/controllers/stripe.controller', () => ({
  createStripeCustomer: jest.fn(),
  createStripeAccount: jest.fn(),
}));

// Setup Express app for testing
const app = express();
app.use(express.json());

app.patch('/users/:userName', userController.updateOne);
app.post('/users/reset-token', userController.setResetToken);
app.patch('/users/password', userController.updatePassword);
app.put('/users/password/:token', userController.replacePassword);
app.get('/users/:userName', userController.retrieveOne);
app.post('/users/express-signup', userController.expressSignup);

describe('User Controller Tests', () => {
  describe('updateOne', () => {
    it('should return 404 if the user is not found', async () => {
      User.findByLogin.mockResolvedValue(null);

      const response = await request(app).patch('/users/nonexistentUser').send({ userName: 'updatedUser' });

      expect(response.status).toBe(404);
    });
  });

  describe('replacePassword', () => {
    it('should update the user password successfully', async () => {
      const mockUser = { resetTokenExp: Date.now() + 1000, setPassword: jest.fn().mockResolvedValue() };
      User.findByToken.mockResolvedValue(mockUser);

      const response = await request(app).put('/users/password/resetToken123').send({ password: 'newPassword123' });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Password successfully updated');
      expect(mockUser.setPassword).toHaveBeenCalledWith('newPassword123');
    });

    it('should return 401 if the reset token is expired', async () => {
      const mockUser = { resetTokenExp: Date.now() - 1000 };
      User.findByToken.mockResolvedValue(mockUser);

      const response = await request(app).put('/users/password/resetToken123').send({ password: 'newPassword123' });

      expect(response.status).toBe(401);
    });
  });

  describe('retrieveOne', () => {
    it('should retrieve a user successfully', async () => {
      const mockUser = { stripSensitive: jest.fn().mockReturnValue({ userName: 'testUser' }) };
      User.findByLogin.mockResolvedValue(mockUser);

      const response = await request(app).get('/users/testUser');

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('User data sent successfully');
      expect(response.body.user).toEqual({ userName: 'testUser' });
    });
  });

  describe('expressSignup', () => {
    it('should handle errors during signup', async () => {
      createStripeCustomer.mockRejectedValue(new Error('Stripe API error'));

      const response = await request(app).post('/users/express-signup').send({
        userName: 'newUser',
        email: 'newUser@example.com',
        password: 'securePassword',
      });

      expect(response.status).toBe(500);
    });
  });
});

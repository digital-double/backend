const request = require('supertest');
const express = require('express');
const voidanceController = require('../../app/controllers/voidance.controller');
const { Voidance, VoidanceInvite } = require('../../app/models');

// Mock models
jest.mock('../../app/models', () => ({
  Voidance: {
    findAll: jest.fn(),
    findOne: jest.fn(),
    destroy: jest.fn(),
  },
  VoidanceInvite: {
    findAll: jest.fn(),
    destroy: jest.fn(),
  },
}));

// Setup Express app for testing
const app = express();
app.use(express.json());

app.get('/voidance-invites', voidanceController.getAllVoidanceInvites);
app.delete('/voidance-invites/:id', voidanceController.deleteVoidanceInvite);

describe('Voidance Controller Tests', () => {
  describe('getAllVoidanceInvites', () => {
    it('should handle errors during retrieval', async () => {
      VoidanceInvite.findAll.mockRejectedValue(new Error('Database error'));

      const response = await request(app).get('/voidance-invites');

      expect(response.status).toBe(500);
    });
  });

  describe('deleteVoidanceInvite', () => {
    it('should delete a voidance invite successfully', async () => {
      VoidanceInvite.destroy.mockResolvedValue(1);

      const response = await request(app).delete('/voidance-invites/1').send({ userID: 1 });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Voidance invite deleted successfully');
    });

    it('should return 404 if the invite is not found', async () => {
      VoidanceInvite.destroy.mockResolvedValue(0);

      const response = await request(app).delete('/voidance-invites/999').send({ userID: 1 });

      expect(response.status).toBe(404);
    });
  });
});

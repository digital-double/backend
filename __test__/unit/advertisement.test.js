const request = require('supertest');
const express = require('express');
const path = require('path');
const advertisementController = require('../../app/controllers/advertisement.controller');
const { Advertisement } = require('../../app/models');

// Mock the Advertisement model
jest.mock('../../app/models', () => ({
  Advertisement: {
    create: jest.fn(),
    findByPk: jest.fn(),
  },
}));

// Mock middlewares
const isLoggedIn = jest.fn((req, res, next) => {
  req.user = { userName: 'testUser' }; // Simulate a logged-in user
  next();
});

const isAccountOwner = jest.fn((req, res, next) => {
  next(); // Simulate account ownership validation passing
});

// Mock upload middleware
const mockUploadMiddleware = jest.fn((req, res, next) => {
  req.file = {
    path: path.join(__dirname, '../../db/uploads/test.png'), // Simulate file upload path
  };
  next();
});

// Setup Express app for testing
const app = express();
app.use(express.json());
app.post('/:userName', isLoggedIn, isAccountOwner, mockUploadMiddleware, advertisementController.createAdvertisement);

describe('Advertisement Controller', () => {
  describe('createAdvertisement', () => {
    it('should create a new advertisement successfully', async () => {
      const mockAd = {
        id: '1',
        title: 'Test Ad',
        imagePath: path.join(__dirname, '../../db/uploads/test.png'),
      };
      Advertisement.create.mockResolvedValue(mockAd);

      const userName = 'testUser';

      const response = await request(app)
        .post(`/${userName}`)
        .send({
          campaignID: '123',
          title: 'Test Ad',
          Status: true,
          adStart: new Date().toISOString(),
          adEnd: new Date().toISOString(),
          alocatedBudget: 1000,
          description: 'Test Description',
          avgCPC: 10,
          name: 'Test Name',
        });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Advertisement created successfully');
      expect(response.body.data).toEqual(mockAd);
      expect(Advertisement.create).toHaveBeenCalledWith(
        expect.objectContaining({
          campaignID: '123',
          title: 'Test Ad',
          Status: true,
          alocatedBudget: 1000,
          description: 'Test Description',
          avgCPC: 10,
          name: 'Test Name',
          imagePath: mockAd.imagePath, // Ensure the image path is set correctly
        })
      );
    });

    it('should return 400 if required fields are missing', async () => {
      const userName = 'testUser';

      const response = await request(app).post(`/${userName}`).send({});
      expect(response.status).toBe(400);
    });

    it('should handle errors during advertisement creation', async () => {
      Advertisement.create.mockRejectedValue(new Error('Database error'));

      const userName = 'testUser';

      const response = await request(app).post(`/${userName}`).send({
        campaignID: '123',
        title: 'Test Ad',
        Status: true,
        adStart: new Date().toISOString(),
        adEnd: new Date().toISOString(),
        alocatedBudget: 1000,
        description: 'Test Description',
        avgCPC: 10,
        name: 'Test Name',
      });

      expect(response.status).toBe(500);
    });
  });
});

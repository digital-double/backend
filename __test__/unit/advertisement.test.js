const request = require('supertest');
const express = require('express');
const advertisementController = require('../../app/controllers/advertisement.controller');
const { Advertisement } = require('../../app/models');

// Setup express app for testing
const app = express();
app.use(express.json());

app.get('/ads/:campaignID', advertisementController.getAdvertisementsByCampaign);
app.post('/ads', advertisementController.createAdvertisement);
app.delete('/ads/:id', advertisementController.deleteAdvertisement);
app.get('/ads/search/:id', advertisementController.getAdvertisementById);

describe('Advertisement Controller', () => {
  describe('getAdvertisementsByCampaign', () => {
    it('should retrieve advertisements for a specific campaign', async () => {
      Advertisement.findAll.mockResolvedValue([
        { id: '1', title: 'Ad 1' },
        { id: '2', title: 'Ad 2' },
      ]);

      const response = await request(app).get('/ads/test-campaign-id');
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Advertisements retrieved successfully');
      expect(response.body.data).toHaveLength(2);
      expect(Advertisement.findAll).toHaveBeenCalledWith({
        where: { campaignID: 'test-campaign-id' },
        attributes: { exclude: ['deletedAt', 'createdAt', 'updatedAt'] },
      });
    });

    it('should handle errors during retrieval', async () => {
      Advertisement.findAll.mockRejectedValue(new Error('Database error'));

      const response = await request(app).get('/ads/test-campaign-id');
      expect(response.status).toBe(500);
    });
  });

  describe('createAdvertisement', () => {
    it('should create a new advertisement', async () => {
      const newAd = { id: '1', title: 'New Ad' };
      Advertisement.create.mockResolvedValue(newAd);
    
      const response = await request(app).post('/ads').send({
        campaignID: 'test-campaign-id',
        title: 'New Ad',
        Status: true,
        adStart: new Date().toISOString(), 
        adEnd: new Date().toISOString(),
        alocatedBudget: 1000.0,
        description: 'A new advertisement',
        avgCPC: 10.0,
      });
    
      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Advertisement created successfully');
      expect(response.body.data).toEqual(newAd);
      expect(Advertisement.create).toHaveBeenCalledWith(
        expect.objectContaining({
          campaignID: 'test-campaign-id',
          title: 'New Ad',
          Status: true,
          adStart: expect.any(String), 
          adEnd: expect.any(String),
          alocatedBudget: 1000.0,
          description: 'A new advertisement',
          avgCPC: 10.0,
        })
      );
    });

    it('should return a 400 error if campaignID is not provided', async () => {
      const response = await request(app).post('/ads').send({
        title: 'New Ad',
        Status: true,
      });
      expect(response.status).toBe(400);
    });

    it('should handle errors during creation', async () => {
      Advertisement.create.mockRejectedValue(new Error('Database error'));

      const response = await request(app).post('/ads').send({
        campaignID: 'test-campaign-id',
        title: 'New Ad',
      });

      expect(response.status).toBe(500);
    });
  });

  describe('deleteAdvertisement', () => {
    it('should delete an advertisement by ID', async () => {
      const mockAd = { id: '1', destroy: jest.fn() };
      Advertisement.findByPk.mockResolvedValue(mockAd);

      const response = await request(app).delete('/ads/1');

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Advertisement deleted successfully');
      expect(mockAd.destroy).toHaveBeenCalled();
    });

    it('should return 404 if advertisement is not found', async () => {
      Advertisement.findByPk.mockResolvedValue(null);

      const response = await request(app).delete('/ads/non-existent-id');

      expect(response.status).toBe(404);
    });

    it('should handle errors during deletion', async () => {
      Advertisement.findByPk.mockRejectedValue(new Error('Database error'));

      const response = await request(app).delete('/ads/1');
      expect(response.status).toBe(500);
    });
  });

  describe('getAdvertisementById', () => {
    it('should retrieve an advertisement by ID', async () => {
      const mockAd = { id: '1', title: 'Test Ad' };
      Advertisement.findByPk.mockResolvedValue(mockAd);

      const response = await request(app).get('/ads/search/1');

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Advertisement retrieved successfully');
      expect(response.body.data).toEqual(mockAd);
    });

    it('should return 404 if advertisement is not found', async () => {
      Advertisement.findByPk.mockResolvedValue(null);

      const response = await request(app).get('/ads/search/non-existent-id');

      expect(response.status).toBe(404);
    });

    it('should handle errors during retrieval', async () => {
      Advertisement.findByPk.mockRejectedValue(new Error('Database error'));

      const response = await request(app).get('/ads/search/1');
      expect(response.status).toBe(500);
    });
  });
});

  

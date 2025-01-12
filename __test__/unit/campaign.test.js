const request = require('supertest');
const express = require('express');
const campaignController = require('../../app/controllers/campaign.controller');
const { Campaign, Advertisement } = require('../../app/models');

// Mock the models
jest.mock('../../app/models', () => ({
  Campaign: {
    findAll: jest.fn(),
    findByPk: jest.fn(),
    create: jest.fn(),
  },
  Advertisement: {
    findAll: jest.fn(),
  },
}));

// Setup Express app for testing
const app = express();
app.use(express.json());

app.get('/campaigns', (req, res, next) => {
  req.user = { companyID: 'test-company-id' }; // Mock user
  return campaignController.getAllCampaigns(req, res, next);
});
app.post('/campaigns', campaignController.createCampaign);
app.patch('/campaigns', campaignController.updateCampaign);
app.get('/campaigns/:campaignID/ads', campaignController.getAdvertisementsInCampaign);
app.delete('/campaigns', campaignController.deleteCampaign);

describe('Campaign Controller Tests', () => {
  describe('getAllCampaigns', () => {
    it('should retrieve all campaigns for a company', async () => {
      const mockCampaigns = [{ id: '1', title: 'Campaign 1' }, { id: '2', title: 'Campaign 2' }];
      Campaign.findAll.mockResolvedValue(mockCampaigns);

      const response = await request(app).get('/campaigns');

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Campaigns retrieved successfully');
      expect(response.body.data).toEqual(mockCampaigns);
    });
  });

  describe('createCampaign', () => {
    it('should create a new campaign successfully', async () => {
      const mockCampaign = { id: '1', title: 'New Campaign' };
      Campaign.create.mockResolvedValue(mockCampaign);

      const response = await request(app).post('/campaigns').send({
        title: 'New Campaign',
        description: 'A test campaign',
        totalBudget: 10000,
        campaignStatus: true,
        campaignStart: new Date(),
        campaignEnd: new Date(),
      });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Campaign created successfully');
      expect(response.body.data).toEqual(mockCampaign);
    });

    it('should return 400 if required fields are missing', async () => {
      const response = await request(app).post('/campaigns').send({});

      expect(response.status).toBe(400);
    });
  });

  describe('updateCampaign', () => {
    it('should update a campaign successfully', async () => {
      const mockCampaign = { id: '1', update: jest.fn().mockResolvedValue({ title: 'Updated Campaign' }) };
      Campaign.findByPk.mockResolvedValue(mockCampaign);

      const response = await request(app).patch('/campaigns').send({ id: '1', title: 'Updated Campaign' });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Campaign updated successfully');
      expect(mockCampaign.update).toHaveBeenCalledWith({ id: '1', title: 'Updated Campaign' });
    });

    it('should return 404 if campaign is not found', async () => {
      Campaign.findByPk.mockResolvedValue(null);

      const response = await request(app).patch('/campaigns').send({ id: 'non-existent-id' });

      expect(response.status).toBe(404);
    });
  });

  describe('getAdvertisementsInCampaign', () => {
    it('should retrieve advertisements in a campaign successfully', async () => {
      const mockAds = [{ id: '1', title: 'Ad 1' }, { id: '2', title: 'Ad 2' }];
      Advertisement.findAll.mockResolvedValue(mockAds);

      const response = await request(app).get('/campaigns/test-campaign-id/ads');

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Advertisements retrieved successfully');
      expect(response.body.data).toEqual(mockAds);
    });

    it('should return 404 if no advertisements are found', async () => {
      Advertisement.findAll.mockResolvedValue([]);

      const response = await request(app).get('/campaigns/test-campaign-id/ads');

      expect(response.status).toBe(404);
    });
  });

  describe('deleteCampaign', () => {
    it('should delete a campaign successfully', async () => {
      const mockCampaign = { id: '1', destroy: jest.fn() };
      Campaign.findByPk.mockResolvedValue(mockCampaign);

      const response = await request(app).delete('/campaigns').send({ id: '1' });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Campaign deleted successfully');
      expect(mockCampaign.destroy).toHaveBeenCalled();
    });

    it('should return 404 if campaign is not found', async () => {
      Campaign.findByPk.mockResolvedValue(null);

      const response = await request(app).delete('/campaigns').send({ id: 'non-existent-id' });

      expect(response.status).toBe(404);
    });
  });
});

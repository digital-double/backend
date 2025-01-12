const request = require('supertest');
const express = require('express');
const affiliateController = require('../../app/controllers/affiliate.controller');
const { AffiliateLink, ReferralIP } = require('../../app/models');
const crypto = require('crypto');

// Mock models
jest.mock('../../app/models', () => ({
  AffiliateLink: {
    findOne: jest.fn(),
    save: jest.fn(),
  },
  ReferralIP: {
    findOne: jest.fn(),
    create: jest.fn(),
  },
}));

// Hashing function
function hashIPAddress(ipAddress) {
  const hash = crypto.createHash('sha256');
  hash.update(ipAddress);
  return hash.digest('hex');
}

// Setup Express app
const app = express();
app.use(express.json());
app.get('/:uniqueIdentifier', affiliateController.registerClick);

describe('Affiliate Controller', () => {
  describe('registerClick', () => {

    it('should return 404 if affiliate link is not found', async () => {
      AffiliateLink.findOne.mockResolvedValue(null);

      const response = await request(app)
        .get('/invalid-identifier')
        .set('X-Forwarded-For', '127.0.0.1'); // Simulate IP address

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Affiliate link not found.');
    });
  });
});

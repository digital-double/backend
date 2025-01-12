const request = require('supertest');
const express = require('express');
const companyController = require('../../app/controllers/company.controller');
const { Company } = require('../../app/models');

// Mock the models
jest.mock('../../app/models', () => ({
  Company: {
    findAll: jest.fn(),
    findByPk: jest.fn(),
  },
}));

// Setup Express app for testing
const app = express();
app.use(express.json());

app.get('/companies', companyController.getAllCompanies);
app.patch('/companies', (req, res, next) => {
  req.user = { companyID: 'test-company-id' }; // Mock user
  return companyController.updateCompany(req, res, next);
});
app.delete('/companies', (req, res, next) => {
  req.user = { companyID: 'test-company-id' }; // Mock user
  return companyController.deleteCompany(req, res, next);
});

describe('Company Controller Tests', () => {
  describe('getAllCompanies', () => {
    it('should retrieve all companies successfully', async () => {
      const mockCompanies = [
        { id: '1', name: 'Company 1' },
        { id: '2', name: 'Company 2' },
      ];
      Company.findAll.mockResolvedValue(mockCompanies);

      const response = await request(app).get('/companies');

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Companies retrieved successfully');
      expect(response.body.data).toEqual(mockCompanies);
    });

    it('should handle errors during retrieval', async () => {
      Company.findAll.mockRejectedValue(new Error('Database error'));

      const response = await request(app).get('/companies');

      expect(response.status).toBe(500);
    });
  });

  describe('updateCompany', () => {
    it('should update a company successfully', async () => {
      const mockCompany = { id: '1', name: 'Updated Company', update: jest.fn().mockResolvedValue({ name: 'Updated Company' }) };
      Company.findByPk.mockResolvedValue(mockCompany);

      const response = await request(app).patch('/companies').send({ name: 'Updated Company' });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Company updated successfully');
      expect(mockCompany.update).toHaveBeenCalledWith({ name: 'Updated Company' });
    });

    it('should return 404 if company is not found', async () => {
      Company.findByPk.mockResolvedValue(null);

      const response = await request(app).patch('/companies').send({ name: 'Updated Company' });

      expect(response.status).toBe(404);
    });

    it('should handle errors during update', async () => {
      Company.findByPk.mockRejectedValue(new Error('Database error'));

      const response = await request(app).patch('/companies').send({ name: 'Updated Company' });

      expect(response.status).toBe(500);
    });
  });

  describe('deleteCompany', () => {
    it('should delete a company successfully', async () => {
      const mockCompany = { id: '1', destroy: jest.fn() };
      Company.findByPk.mockResolvedValue(mockCompany);

      const response = await request(app).delete('/companies');

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Company deleted successfully');
      expect(mockCompany.destroy).toHaveBeenCalled();
    });

    it('should return 404 if company is not found', async () => {
      Company.findByPk.mockResolvedValue(null);

      const response = await request(app).delete('/companies');

      expect(response.status).toBe(404);
    });

    it('should handle errors during deletion', async () => {
      Company.findByPk.mockRejectedValue(new Error('Database error'));

      const response = await request(app).delete('/companies');

      expect(response.status).toBe(500);
    });
  });
});

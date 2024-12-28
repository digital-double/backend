const { getAllCampaigns, createCampaign, updateCampaign, deleteCampaign } = require('../../app/controllers/campaign.controller');
const { Campaign, Company } = require('../../app/models');

jest.mock('../../app/models', () => ({
  Campaign: {
    findAll: jest.fn(),
    findByPk: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    destroy: jest.fn(),
    update: jest.fn(),
  },
  Company: {
    findByPk: jest.fn(),
  },
}));

describe('Campaign Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllCampaigns', () => {
    it('should retrieve all campaigns for a company', async () => {
      const mockCampaigns = [
        { id: 'campaign1', title: 'Campaign A', Company: { companyName: 'Company A', logo: 'logo.png' } },
        { id: 'campaign2', title: 'Campaign B', Company: { companyName: 'Company B', logo: 'logo2.png' } },
      ];
      Campaign.findAll.mockResolvedValue(mockCampaigns);

      const req = { body: { companyID: 'company1' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await getAllCampaigns(req, res, jest.fn());

      expect(Campaign.findAll).toHaveBeenCalledWith({
        where: { companyID: 'company1' },
        include: [
          {
            model: Company,
            required: true,
            attributes: ['companyName', 'logo'],
          },
        ],
        attributes: {
          exclude: ['deletedAt', 'createdAt', 'updatedAt', 'companyID'],
        },
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Campaigns retrieved successfully',
        data: mockCampaigns,
      });
    });

    it('should handle errors', async () => {
      Campaign.findAll.mockRejectedValue(new Error('Database error'));

      const req = { body: { companyID: 'company1' } };
      const next = jest.fn();

      await getAllCampaigns(req, {}, next);

      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe('createCampaign', () => {
    it('should create a new campaign and retrieve it with details', async () => {
      const mockCampaign = { id: 'campaign1', title: 'Campaign A' };
      const createdCampaign = { ...mockCampaign, Company: { companyName: 'Company A', logo: 'logo.png' } };
      Campaign.create.mockResolvedValue(mockCampaign);
      Campaign.findOne.mockResolvedValue(createdCampaign);

      const req = { body: { title: 'Campaign A', companyID: 'company1' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await createCampaign(req, res, jest.fn());

      expect(Campaign.create).toHaveBeenCalledWith(req.body);
      expect(Campaign.findOne).toHaveBeenCalledWith({
        where: { id: mockCampaign.id },
        include: [
          {
            model: Company,
            required: true,
            attributes: ['companyName', 'logo'],
          },
        ],
        attributes: {
          exclude: ['deletedAt', 'createdAt'],
        },
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Campaign created successfully',
        data: createdCampaign,
      });
    });

    it('should handle errors', async () => {
      Campaign.create.mockRejectedValue(new Error('Database error'));

      const req = { body: { title: 'Campaign A', companyID: 'company1' } };
      const next = jest.fn();

      await createCampaign(req, {}, next);

      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe('updateCampaign', () => {
    it('should update an existing campaign and retrieve updated details', async () => {
      const mockCampaign = { id: 'campaign1', title: 'Old Title', update: jest.fn().mockResolvedValue(true) };
      const updatedCampaign = { id: 'campaign1', title: 'Updated Title', Company: { companyName: 'Company A', logo: 'logo.png' } };
      Campaign.findByPk.mockResolvedValue(mockCampaign);
      Campaign.findOne.mockResolvedValue(updatedCampaign);

      const req = { params: { id: 'campaign1' }, body: { title: 'Updated Title' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await updateCampaign(req, res, jest.fn());

      expect(Campaign.findByPk).toHaveBeenCalledWith('campaign1');
      expect(mockCampaign.update).toHaveBeenCalledWith(req.body);
      expect(Campaign.findOne).toHaveBeenCalledWith({
        where: { id: 'campaign1' },
        include: [
          {
            model: Company,
            required: true,
            attributes: ['companyName', 'logo'],
          },
        ],
        attributes: {
          exclude: ['deletedAt', 'createdAt', 'updatedAt'],
        },
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Campaign updated successfully',
        data: updatedCampaign,
      });
    });

    it('should return 404 if campaign is not found', async () => {
      Campaign.findByPk.mockResolvedValue(null);

      const req = { params: { id: 'nonexistent-id' }, body: {} };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await updateCampaign(req, res, jest.fn());

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Campaign not found' });
    });

    it('should handle errors', async () => {
      Campaign.findByPk.mockRejectedValue(new Error('Database error'));

      const req = { params: { id: 'campaign1' }, body: {} };
      const next = jest.fn();

      await updateCampaign(req, {}, next);

      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe('deleteCampaign', () => {
    it('should delete a campaign', async () => {
      const mockCampaign = { id: 'campaign1', destroy: jest.fn() };
      Campaign.findByPk.mockResolvedValue(mockCampaign);

      const req = { params: { id: 'campaign1' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await deleteCampaign(req, res, jest.fn());

      expect(Campaign.findByPk).toHaveBeenCalledWith('campaign1');
      expect(mockCampaign.destroy).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Campaign deleted successfully' });
    });

    it('should return 404 if campaign is not found', async () => {
      Campaign.findByPk.mockResolvedValue(null);

      const req = { params: { id: 'nonexistent-id' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await deleteCampaign(req, res, jest.fn());

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Campaign not found' });
    });

    it('should handle errors', async () => {
      Campaign.findByPk.mockRejectedValue(new Error('Database error'));

      const req = { params: { id: 'campaign1' } };
      const next = jest.fn();

      await deleteCampaign(req, {}, next);

      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });
});

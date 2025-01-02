const { retrieveFiltered, getProfile, getVoidanceInvites } = require('../../app/controllers/app.controller');
const { Advertisement, Company, Campaign, Users, Voidances, VoidanceInvite, ContactUs, CompanyAdmin } = require('../../app/models');

jest.mock('../../app/models', () => ({
  Advertisement: {
    findAll: jest.fn(),
  },
  Company: {
    findOne: jest.fn(),
  },
  Campaign: {
    findAll: jest.fn(),
  },
  Users: {
    findOne: jest.fn(),
  },
  Voidances: {
    findAll: jest.fn(),
  },
  VoidanceInvite: {
    findAll: jest.fn(),
  },
  ContactUs: {
    findAll: jest.fn(),
  },
  CompanyAdmin: {
    findOne: jest.fn(),
  },
}));

describe('App Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('retrieveFiltered', () => {
    it('should retrieve advertisements filtered by title', async () => {
      const mockContent = [{ id: 'ad1', title: 'Title A' }];
      Advertisement.findAll.mockResolvedValue(mockContent);

      const req = { body: { title: 'Title A', offset: 0 } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await retrieveFiltered(req, res, jest.fn());

      expect(Advertisement.findAll).toHaveBeenCalledWith({
        where: { title: 'Title A' },
        offset: 0,
        limit: 20,
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Contents retrieved',
        data: mockContent,
      });
    });

    it('should return an empty response if no title is provided', async () => {
      const req = { body: {} };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await retrieveFiltered(req, res, jest.fn());

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'No content',
        data: [],
      });
    });

    it('should handle errors', async () => {
      Advertisement.findAll.mockRejectedValue(new Error('Database error'));

      const req = { body: { title: 'Title A' } };
      const next = jest.fn();

      await retrieveFiltered(req, {}, next);

      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe('getProfile', () => {
    it('should retrieve a company profile with campaigns', async () => {
      const mockCompany = { id: 'company1', companyName: 'Company A' };
      const mockCampaigns = [{ id: 'campaign1', title: 'Campaign A' }];
      Company.findOne.mockResolvedValue(mockCompany);
      Campaign.findAll.mockResolvedValue(mockCampaigns);

      const req = { params: { userName: 'CompanyA' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await getProfile(req, res, jest.fn());

      expect(Company.findOne).toHaveBeenCalledWith({
        where: { userName: 'CompanyA' },
        attributes: {
          exclude: [
            'bankName',
            'bankAccName',
            'bankAccNo',
            'bankRoutingNo',
            'paypalAcc',
            'bankIban',
            'bankPaymentStatus',
            'createdAt',
            'updatedAt',
            'deletedAt',
          ],
        },
      });
      expect(Campaign.findAll).toHaveBeenCalledWith({
        where: { companyID: 'company1' },
        attributes: {
          exclude: [
            'potentialReach',
            'potentialEngagement',
            'actualEngagement',
            'createdAt',
            'updatedAt',
            'deletedAt',
            'numOfConversions',
          ],
        },
      });
      expect(res.status).toHaveBeenCalledWith(200);
    });

    it('should retrieve a user profile with voidances if the user is not a company', async () => {
      const mockUser = { id: 'user1', userName: 'UserA' };
      const mockVoidances = [{ id: 'voidance1', description: 'Voidance A' }];
      Company.findOne.mockResolvedValue(null);
      Users.findOne.mockResolvedValue(mockUser);
      Voidances.findAll.mockResolvedValue(mockVoidances);

      const req = { params: { userName: 'UserA' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await getProfile(req, res, jest.fn());

      expect(Users.findOne).toHaveBeenCalledWith({
        where: { userName: 'UserA' },
        attributes: { exclude: ['password'] },
      });
      expect(Voidances.findAll).toHaveBeenCalledWith({
        where: { userId: 'user1' },
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'deletedAt', 'qualityScore'],
        },
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'User data retrieved successfully',
        data: { user: mockUser, voidances: mockVoidances },
      });
    });

    it('should handle errors', async () => {
      Company.findOne.mockRejectedValue(new Error('Database error'));

      const req = { params: { userName: 'UserA' } };
      const next = jest.fn();

      await getProfile(req, {}, next);

      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe('getVoidanceInvites', () => {
    it('should retrieve voidance invites for a user', async () => {
      const mockInvites = [{ id: 'invite1', message: 'Invite A' }];
      VoidanceInvite.findAll.mockResolvedValue(mockInvites);

      const req = { params: { userID: 'user1' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await getVoidanceInvites(req, res, jest.fn());

      expect(VoidanceInvite.findAll).toHaveBeenCalledWith({
        where: { userId: 'user1' },
        attributes: { exclude: ['updatedAt', 'deletedAt'] },
        include: [
          { model: Company, attributes: ['id', 'companyName'] },
          { model: Advertisement, attributes: ['id', 'title'] },
        ],
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'VoidanceInvites retrieved successfully.',
        data: mockInvites,
      });
    });

    it('should handle errors', async () => {
      VoidanceInvite.findAll.mockRejectedValue(new Error('Database error'));

      const req = { params: { userID: 'user1' } };
      const next = jest.fn();

      await getVoidanceInvites(req, {}, next);

      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });
});

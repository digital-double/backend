const { getAllCompanies, getCompanyById, createCompany, updateCompany, deleteCompany, getProfile } = require('../../app/controllers/company.controller');
const { Company, Campaign } = require('../../app/models');

jest.mock('../../app/models', () => ({
  Company: {
    findAll: jest.fn(),
    findByPk: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
    findCompanyByID: jest.fn(),
  },
  Campaign: {
    findAll: jest.fn(),
  },
}));

describe('Company Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllCompanies', () => {
    it('should retrieve all companies', async () => {
      const mockCompanies = [{ id: '1', companyName: 'Company A' }, { id: '2', companyName: 'Company B' }];
      Company.findAll.mockResolvedValue(mockCompanies);

      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await getAllCompanies(req, res, jest.fn());

      expect(Company.findAll).toHaveBeenCalledWith({
        attributes: {
          exclude: ['deletedAt', 'description', 'banner', 'websiteUrl', 'industry', 'bankName', 'bankAccName', 'bankAccNo', 'bankRoutingNo', 'paypalAcc', 'bankIban', 'bankPaymentStatus', 'createdAt', 'updatedAt'],
        },
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Companies retrieved successfully',
        data: mockCompanies,
      });
    });

    it('should handle errors', async () => {
      Company.findAll.mockRejectedValue(new Error('Database error'));

      const req = {};
      const next = jest.fn();

      await getAllCompanies(req, {}, next);

      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe('getCompanyById', () => {
    it('should retrieve a company by ID', async () => {
      const mockCompany = { id: '1', companyName: 'Company A' };
      Company.findCompanyByID.mockResolvedValue(mockCompany);

      const req = { params: { id: '1' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await getCompanyById(req, res, jest.fn());

      expect(Company.findCompanyByID).toHaveBeenCalledWith('1');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Company retrieved successfully',
        data: mockCompany,
      });
    });

    it('should handle errors', async () => {
      Company.findCompanyByID.mockRejectedValue(new Error('Database error'));

      const req = { params: { id: '1' } };
      const next = jest.fn();

      await getCompanyById(req, {}, next);

      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe('createCompany', () => {
    it('should create a new company', async () => {
      const mockCompany = { id: '1', companyName: 'New Company' };
      Company.create.mockResolvedValue(mockCompany);

      const req = { body: { companyName: 'New Company' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await createCompany(req, res, jest.fn());

      expect(Company.create).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Company created successfully',
        data: mockCompany,
      });
    });

    it('should handle errors', async () => {
      Company.create.mockRejectedValue(new Error('Database error'));

      const req = { body: { companyName: 'New Company' } };
      const next = jest.fn();

      await createCompany(req, {}, next);

      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe('updateCompany', () => {
    it('should update an existing company', async () => {
      const mockCompany = { id: '1', companyName: 'Old Name', update: jest.fn().mockResolvedValue({ id: '1', companyName: 'Updated Name' }) };
      Company.findByPk.mockResolvedValue(mockCompany);

      const req = { params: { id: '1' }, body: { companyName: 'Updated Name' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await updateCompany(req, res, jest.fn());

      expect(Company.findByPk).toHaveBeenCalledWith('1');
      expect(mockCompany.update).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Company updated successfully',
        data: { id: '1', companyName: 'Updated Name' },
      });
    });

    it('should return 404 if company is not found', async () => {
      Company.findByPk.mockResolvedValue(null);

      const req = { params: { id: 'nonexistent-id' }, body: {} };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await updateCompany(req, res, jest.fn());

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Company not found' });
    });

    it('should handle errors', async () => {
      Company.findByPk.mockRejectedValue(new Error('Database error'));

      const req = { params: { id: '1' }, body: {} };
      const next = jest.fn();

      await updateCompany(req, {}, next);

      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe('deleteCompany', () => {
    it('should delete a company', async () => {
      const mockCompany = { id: '1', destroy: jest.fn() };
      Company.findByPk.mockResolvedValue(mockCompany);

      const req = { params: { id: '1' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await deleteCompany(req, res, jest.fn());

      expect(Company.findByPk).toHaveBeenCalledWith('1');
      expect(mockCompany.destroy).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Company deleted successfully' });
    });

    it('should return 404 if company is not found', async () => {
      Company.findByPk.mockResolvedValue(null);

      const req = { params: { id: 'nonexistent-id' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await deleteCompany(req, res, jest.fn());

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Company not found' });
    });

    it('should handle errors', async () => {
      Company.findByPk.mockRejectedValue(new Error('Database error'));

      const req = { params: { id: '1' } };
      const next = jest.fn();

      await deleteCompany(req, {}, next);

      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe('getProfile', () => {
    it('should retrieve a company with its campaigns', async () => {
      const mockCompany = {
        id: '1',
        companyName: 'Company A',
        Campaigns: [{ id: 'campaign1', title: 'Campaign A' }],
      };
      Company.findOne.mockResolvedValue(mockCompany);

      const req = { params: { companyName: 'Company A' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await getProfile(req, res, jest.fn());

      expect(Company.findOne).toHaveBeenCalledWith({
        where: { companyName: 'Company A' },
        attributes: {
          exclude: ['industry', 'bankName', 'bankAccName', 'bankAccNo', 'bankRoutingNo', 'paypalAcc', 'bankIban', 'bankPaymentStatus', 'createdAt', 'updatedAt'],
        },
        include: [
          {
            model: Campaign,
            attributes: {
              exclude: ['potentialReach', 'potentialEngagement', 'actualEngagement', 'createdAt', 'updatedAt', 'deletedAt', 'numOfConversions'],
            },
          },
        ],
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Company with campaigns retrieved successfully',
        data: mockCompany,
      });
    });

    it('should return 404 if company is not found', async () => {
      Company.findOne.mockResolvedValue(null);

      const req = { params: { companyName: 'Nonexistent Company' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await getProfile(req, res, jest.fn());

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Company not found' });
    });

    it('should handle errors', async () => {
      Company.findOne.mockRejectedValue(new Error('Database error'));

      const req = { params: { companyName: 'Company A' } };
      const next = jest.fn();

      await getProfile(req, {}, next);

      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });
});

const { getCompanyAdmins, checkCompanyAdmin, postCompanyAdmin, deleteCompanyAdmin, updateCompanyAdmin } = require('../../app/controllers/companyAdmin.controller');
const { CompanyAdmin } = require('../../app/models');

jest.mock('../../app/models', () => ({
    CompanyAdmin: {
      findAll: jest.fn(),
      findOne: jest.fn(),
      findByPk: jest.fn(),
      create: jest.fn(),
      destroy: jest.fn(),
    },
  }));

describe('CompanyAdmin Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getCompanyAdmins', () => {
    it('should retrieve all admins for a company', async () => {
      const mockAdmins = [
        { id: 'admin1', email: 'admin1@example.com', accessRights: 'Admin' },
        { id: 'admin2', email: 'admin2@example.com', accessRights: 'Admin' },
      ];
      CompanyAdmin.findAll.mockResolvedValue(mockAdmins);

      const req = { body: { companyID: 'company1' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await getCompanyAdmins(req, res, jest.fn());

      expect(CompanyAdmin.findAll).toHaveBeenCalledWith({
        where: { companyID: 'company1' },
        attributes: { exclude: ['password', 'deletedAt', 'createdAt', 'updatedAt'] },
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Admins retrieved successfully',
        data: mockAdmins,
      });
    });

    it('should handle errors', async () => {
      CompanyAdmin.findAll.mockRejectedValue(new Error('Database error'));

      const req = { body: { companyID: 'company1' } };
      const next = jest.fn();

      await getCompanyAdmins(req, {}, next);

      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe('checkCompanyAdmin', () => {
    it('should return true if no admin exists', async () => {
      CompanyAdmin.findOne.mockResolvedValue(null);

      const req = { body: { companyID: 'company1', email: 'newadmin@example.com' } };
      const res = {};
      const next = jest.fn();

      const result = await checkCompanyAdmin(req, res, next);

      expect(CompanyAdmin.findOne).toHaveBeenCalledWith({
        where: { companyID: 'company1' },
      });
      expect(result).toBe(true);
    });

    it('should return false if an admin exists', async () => {
      CompanyAdmin.findOne.mockResolvedValue({ id: 'existing-admin-id' });

      const req = { body: { companyID: 'company1', email: 'existingadmin@example.com' } };
      const res = {};
      const next = jest.fn();

      const result = await checkCompanyAdmin(req, res, next);

      expect(CompanyAdmin.findOne).toHaveBeenCalledWith({
        where: { companyID: 'company1' },
      });
      expect(result).toBe(false);
    });

    it('should handle errors', async () => {
      CompanyAdmin.findOne.mockRejectedValue(new Error('Database error'));

      const req = { body: { companyID: 'company1', email: 'newadmin@example.com' } };
      const next = jest.fn();

      await checkCompanyAdmin(req, {}, next);

      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe('postCompanyAdmin', () => {
    it('should create a new company admin', async () => {
      CompanyAdmin.create.mockResolvedValue({ id: 'new-admin-id' });

      const req = { body: { companyID: 'company1', email: 'newadmin@example.com' } };
      const user = { id: 'user1' };
      const next = jest.fn();

      await postCompanyAdmin(req, {}, next, user);

      expect(CompanyAdmin.create).toHaveBeenCalledWith({
        companyID: 'company1',
        email: 'newadmin@example.com',
        accessRights: 'Admin',
        userID: 'user1',
      });
    });

    it('should handle errors', async () => {
      CompanyAdmin.create.mockRejectedValue(new Error('Database error'));

      const req = { body: { companyID: 'company1', email: 'newadmin@example.com' } };
      const user = { id: 'user1' };
      const next = jest.fn();

      await postCompanyAdmin(req, {}, next, user);

      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe('deleteCompanyAdmin', () => {
    it('should delete a company admin', async () => {
      const mockAdmin = { id: 'admin-id', destroy: jest.fn() };
      CompanyAdmin.findByPk.mockResolvedValue(mockAdmin);

      const req = { params: { id: 'admin-id' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await deleteCompanyAdmin(req, res, jest.fn());

      expect(CompanyAdmin.findByPk).toHaveBeenCalledWith('admin-id');
      expect(mockAdmin.destroy).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Admin deleted successfully',
      });
    });

    it('should return 404 if admin is not found', async () => {
      CompanyAdmin.findByPk.mockResolvedValue(null);

      const req = { params: { id: 'nonexistent-id' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await deleteCompanyAdmin(req, res, jest.fn());

      expect(CompanyAdmin.findByPk).toHaveBeenCalledWith('nonexistent-id');
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Admin not found',
      });
    });

    it('should handle errors', async () => {
      CompanyAdmin.findByPk.mockRejectedValue(new Error('Database error'));

      const req = { params: { id: 'admin-id' } };
      const next = jest.fn();

      await deleteCompanyAdmin(req, {}, next);

      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe('updateCompanyAdmin', () => {
    it('should update an admin\'s details', async () => {
      const mockAdmin = {
        id: 'admin-id',
        email: 'oldemail@example.com',
        save: jest.fn(),
      };
      CompanyAdmin.findByPk.mockResolvedValue(mockAdmin);

      const req = {
        params: { id: 'admin-id' },
        body: { email: 'newemail@example.com', accessRights: 'Editor' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await updateCompanyAdmin(req, res, jest.fn());

      expect(CompanyAdmin.findByPk).toHaveBeenCalledWith('admin-id');
      expect(mockAdmin.email).toBe('newemail@example.com');
      expect(mockAdmin.accessRights).toBe('Editor');
      expect(mockAdmin.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Admin updated successfully',
        data: mockAdmin,
      });
    });

    it('should return 404 if admin is not found', async () => {
      CompanyAdmin.findByPk.mockResolvedValue(null);

      const req = { params: { id: 'nonexistent-id' }, body: {} };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await updateCompanyAdmin(req, res, jest.fn());

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Admin not found',
      });
    });

    it('should handle errors', async () => {
      CompanyAdmin.findByPk.mockRejectedValue(new Error('Database error'));

      const req = { params: { id: 'admin-id' }, body: {} };
      const next = jest.fn();

      await updateCompanyAdmin(req, {}, next);

      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });
});

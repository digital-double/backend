const { login, logout, validateSession, validationResponse } = require('../../app/controllers/session.controller');

describe('Session Controller', () => {
  describe('login', () => {
    it('should log in the user and return a success message', () => {
      const mockUser = {
        id: 'user-id',
        stripSensitive: jest.fn(() => ({ id: 'user-id', username: 'testuser' })),
      };
      const req = { user: mockUser };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      login(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Successfully logged in',
        user: { id: 'user-id', username: 'testuser' },
      });
    });
  });

  describe('logout', () => {
    it('should log out the user and return a success message', () => {
      const req = {
        logout: jest.fn((callback) => callback(null)),
      };
      const res = {
        clearCookie: jest.fn().mockReturnThis(),
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      logout(req, res);

      expect(req.logout).toHaveBeenCalled();
      expect(res.clearCookie).toHaveBeenCalledWith('my.sid', { path: '/' });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Successfully logged out',
      });
    });

    it('should call next with an error if logout fails', () => {
      const logoutError = new Error('Logout failed');
      const req = {
        logout: jest.fn((callback) => callback(logoutError)),
      };
      const next = jest.fn();

      logout(req, {}, next);

      expect(req.logout).toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(logoutError);
    });
  });

  describe('validateSession', () => {
    it('should validate the session if the user is logged in', () => {
      const mockUser = {
        id: 'user-id',
        stripSensitive: jest.fn(() => ({ id: 'user-id', username: 'testuser' })),
      };
      const req = { user: mockUser };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      validateSession(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Valid session',
        user: { id: 'user-id', username: 'testuser' },
      });
    });

  });

  describe('validationResponse', () => {
    it('should return a signup complete message and user ID', () => {
      const req = { user: { id: 'user-id' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      validationResponse(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({
        message: 'signup complete',
        userId: 'user-id',
      });
    });
  });
});

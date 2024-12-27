jest.mock('passport', () => ({
    authenticate: jest.fn(() => (req, res, next) => {
      req.user = {
        id: 1,
        username: 'testuser',
        stripSensitive: jest.fn(() => ({ id: 1, username: 'testuser' })),
      };
      next();
    }),
  }));
  
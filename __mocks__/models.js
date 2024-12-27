const mockAdvertisement = {
    findByPk: jest.fn((id) =>
      Promise.resolve({
        id,
        title: 'Test Ad',
        status: true,
        adStart: new Date(),
        adEnd: new Date(),
        allocatedBudget: 1000.0,
        spentBudget: 500.0,
        conversions: 50,
        leads: 20,
        avgCPC: 10.0,
        totalLikes: 200,
        totalComments: 50,
        description: 'This is a mock advertisement',
        numOfModels: 5,
        potentialReach: 10000,
        fileName: 'test-file.png',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      })
    ),
    findAll: jest.fn(() => Promise.resolve([
      { id: '1', title: 'Ad 1', status: true, allocatedBudget: 1000.0 },
      { id: '2', title: 'Ad 2', status: false, allocatedBudget: 500.0 },
    ])),
    create: jest.fn((adData) =>
      Promise.resolve({
        ...adData,
        id: 'new-id',
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    ),
    update: jest.fn(() => Promise.resolve([1])),
    destroy: jest.fn(() => Promise.resolve(1)),
  };
  
  const mockUsers = {
    findByPk: jest.fn((id) =>
      Promise.resolve({
        id,
        userName: 'testuser',
        email: 'test@example.com',
        stripSensitive: jest.fn(() => ({
          id,
          userName: 'testuser',
          email: 'test@example.com',
        })),
        comparePassword: jest.fn(() => Promise.resolve(true)),
        login: jest.fn(() => Promise.resolve()),
        setPassword: jest.fn(() => Promise.resolve()),
      })
    ),
    findAll: jest.fn(() => Promise.resolve([
      { id: '1', userName: 'user1', email: 'user1@example.com' },
      { id: '2', userName: 'user2', email: 'user2@example.com' },
    ])),
    create: jest.fn((userData) =>
      Promise.resolve({
        ...userData,
        id: 'new-id',
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    ),
    findByLogin: jest.fn((type, credential) =>
      Promise.resolve({
        id: '1',
        userName: credential,
        email: `${credential}@example.com`,
        stripSensitive: jest.fn(() => ({
          id: '1',
          userName: credential,
          email: `${credential}@example.com`,
        })),
      })
    ),
    update: jest.fn(() => Promise.resolve([1])),
    destroy: jest.fn(() => Promise.resolve(1)),
  };
  
  module.exports = {
    Advertisement: mockAdvertisement,
    Users: mockUsers,
  };
  
  
const mockModels = require('./__mocks__/models');

jest.mock('./app/models', () => ({
  Advertisement: mockModels.Advertisement,
  Users: mockModels.Users,
}));

// Mock Sequelize
jest.mock('sequelize', () => require('./__mocks__/sequelize'));

// Mock models/index.js
jest.mock('./app/models', () => require('./__mocks__/models'));


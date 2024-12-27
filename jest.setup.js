const mockModels = require('./__mocks__/models');

jest.mock('./app/models', () => ({
  Advertisement: mockModels.Advertisement,
  Users: mockModels.Users,
  Campaign: mockModels.Campaign,
  Company: mockModels.Company,
  CompanyAdmin: mockModels.CompanyAdmin,
  ContactUs: mockModels.ContactUs,
  Faq: mockModels.Faq,
  InstagramCredentials: mockModels.InstagramCredentials,
  SentInvite: mockModels.SentInvite,
  Session: mockModels.Session,
  VoidanceInvite: mockModels.VoidanceInvite,
  Voidances: mockModels.Voidances,
}));

// Mock Sequelize
jest.mock('sequelize', () => require('./__mocks__/sequelize'));

// Mock models/index.js
jest.mock('./app/models', () => require('./__mocks__/models'));


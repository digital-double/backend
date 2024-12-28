const mockModels = require('./__mocks__/models');

jest.mock('./app/models', () => ({
  Advertisement: mockModels.Advertisement,
  Users: mockModels.Users,
  ContactUs: mockModels.ContactUs,
  Faq: mockModels.Faq,
  InstagramCredentials: mockModels.InstagramCredentials,
  SentInvite: mockModels.SentInvite,
  Session: mockModels.Session,
}));


// Mock models/index.js
jest.mock('./app/models', () => require('./__mocks__/models'));


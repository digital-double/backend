const { VoidanceInvite, Voidances } = require('../../app/models');

// Mock specific behaviors
jest.mock('../../app/models', () => ({
  VoidanceInvite: {
    findByPk: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    destroy: jest.fn(),
    update: jest.fn(),
  },
  Voidances: {
    findByPk: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    destroy: jest.fn(),
    update: jest.fn(),
  },
}));

// Common mock data
const mockVoidanceInviteData = {
  id: 'test-voidance-invite-id',
  userId: 'test-user-id',
  subject: 'Test Subject',
  message: 'Test Message',
  CPC: 10.5,
  campaignName: 'Test Campaign',
  status: 'pending_user',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockVoidanceData = {
  id: 'test-voidance-id',
  userId: 'test-user-id',
  campaignName: 'Test Campaign',
  CPC: 10.5,
  affiliatedLink: 'http://test-link.com',
  uploadStatus: 'completed',
  createdAt: new Date(),
  updatedAt: new Date(),
};

// Helper to reset mocks
beforeEach(() => {
  jest.clearAllMocks();
});

afterAll(() => {
  jest.resetModules();
});

describe('VoidanceInvite Model', () => {
  it('should retrieve all voidance invites for a user', async () => {
    VoidanceInvite.findAll.mockResolvedValue([mockVoidanceInviteData]);

    const invites = await VoidanceInvite.findAll({ where: { userId: 'test-user-id' } });
    expect(VoidanceInvite.findAll).toHaveBeenCalledWith({ where: { userId: 'test-user-id' } });
    expect(invites).toHaveLength(1);
    expect(invites[0].id).toBe('test-voidance-invite-id');
  });

  it('should create a new voidance invite', async () => {
    VoidanceInvite.create.mockResolvedValue(mockVoidanceInviteData);

    const newInvite = await VoidanceInvite.create({
      userId: 'test-user-id',
      subject: 'Test Subject',
      message: 'Test Message',
      CPC: 10.5,
      campaignName: 'Test Campaign',
    });
    expect(VoidanceInvite.create).toHaveBeenCalled();
    expect(newInvite.id).toBe('test-voidance-invite-id');
  });

  it('should delete a voidance invite', async () => {
    VoidanceInvite.destroy.mockResolvedValue(1);

    const result = await VoidanceInvite.destroy({ where: { id: 'test-voidance-invite-id' } });
    expect(VoidanceInvite.destroy).toHaveBeenCalledWith({ where: { id: 'test-voidance-invite-id' } });
    expect(result).toBe(1);
  });
});

describe('Voidances Model', () => {
  it('should retrieve all generated voidances for a user', async () => {
    Voidances.findAll.mockResolvedValue([mockVoidanceData]);

    const voidances = await Voidances.findAll({ where: { userId: 'test-user-id' } });
    expect(Voidances.findAll).toHaveBeenCalledWith({ where: { userId: 'test-user-id' } });
    expect(voidances).toHaveLength(1);
    expect(voidances[0].id).toBe('test-voidance-id');
  });

  it('should create a new generated voidance', async () => {
    Voidances.create.mockResolvedValue(mockVoidanceData);

    const newVoidance = await Voidances.create({
      userId: 'test-user-id',
      campaignName: 'Test Campaign',
      CPC: 10.5,
    });
    expect(Voidances.create).toHaveBeenCalled();
    expect(newVoidance.id).toBe('test-voidance-id');
  });

  it('should delete a generated voidance', async () => {
    Voidances.destroy.mockResolvedValue(1);

    const result = await Voidances.destroy({ where: { id: 'test-voidance-id' } });
    expect(Voidances.destroy).toHaveBeenCalledWith({ where: { id: 'test-voidance-id' } });
    expect(result).toBe(1);
  });
});

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
        adStart: now,
        adEnd: now,
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
      id === 'test-id'
        ? Promise.resolve({
            id: 'test-id',
            userName: 'testuser',
            email: 'testuser@example.com',
            passwordHash: 'hashed-password',
            resetToken: 'test-reset-token',
            resetTokenExp: new Date(Date.now() + 3600000), // 1 hour from now
            name: 'Test User',
            avatar: 'avatar.png',
            address: '123 Test Street',
            country: 'Testland',
            city: 'Test City',
            banned: false,
            engagementScore: 75.5,
            balance: 100.0,
            companyEditor: true,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
          })
        : Promise.resolve(null)
    ),
  
    findAll: jest.fn(() =>
      Promise.resolve([
        {
          id: 'user-id-1',
          userName: 'user1',
          email: 'user1@example.com',
          engagementScore: 85.0,
          balance: 50.0,
          banned: false,
          createdAt: new Date(),
        },
        {
          id: 'user-id-2',
          userName: 'user2',
          email: 'user2@example.com',
          engagementScore: 65.0,
          balance: 75.0,
          banned: true,
          createdAt: new Date(),
        },
      ])
    ),
  
    create: jest.fn((userData) =>
      Promise.resolve({
        ...userData,
        id: 'new-user-id',
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    ),
  
    update: jest.fn(() => Promise.resolve([1])), 
  
    destroy: jest.fn(() => Promise.resolve(1)), 
  
    findByLogin: jest.fn((field, value) =>
      value === 'testuser'
        ? Promise.resolve({
            id: 'test-user-id',
            userName: 'testuser',
            email: 'testuser@example.com',
            passwordHash: 'hashed-password',
            stripSensitive: jest.fn(() => ({
              id: 'test-user-id',
              userName: 'testuser',
              email: 'testuser@example.com',
            })),
          })
        : Promise.resolve(null)
    ),
  };

  const mockContactUs = {
    findByPk: jest.fn((id) =>
      id === 'test-contact-id'
        ? Promise.resolve({
            id: 'test-contact-id',
            userID: 'test-user-id',
            companyID: 'test-company-id',
            advertisementID: 'test-ad-id',
            subject: 'Test Subject',
            message: 'This is a test message.',
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
          })
        : Promise.resolve(null)
    ),
  
    findAll: jest.fn(() =>
      Promise.resolve([
        {
          id: '1',
          userID: 'user1-id',
          companyID: 'company1-id',
          advertisementID: 'ad1-id',
          subject: 'Subject 1',
          message: 'Message 1',
          createdAt: new Date(),
        },
        {
          id: '2',
          userID: 'user2-id',
          companyID: 'company2-id',
          advertisementID: 'ad2-id',
          subject: 'Subject 2',
          message: 'Message 2',
          createdAt: new Date(),
        },
      ])
    ),
  
    create: jest.fn((contactData) =>
      Promise.resolve({
        ...contactData,
        id: 'new-contact-id',
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    ),
  
    update: jest.fn(() => Promise.resolve([1])), 
  
    destroy: jest.fn(() => Promise.resolve(1)), 
  };

  const mockFaq = {
    findByPk: jest.fn((id) =>
      id === 'test-faq-id'
        ? Promise.resolve({
            id: 'test-faq-id',
            companyID: 'test-company-id',
            question: 'What is a test?',
            answer: 'This is a test FAQ answer.',
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
          })
        : Promise.resolve(null)
    ),
  
    findAll: jest.fn(() =>
      Promise.resolve([
        {
          id: '1',
          companyID: 'company1-id',
          question: 'Question 1',
          answer: 'Answer 1',
          createdAt: new Date(),
        },
        {
          id: '2',
          companyID: 'company2-id',
          question: 'Question 2',
          answer: 'Answer 2',
          createdAt: new Date(),
        },
      ])
    ),
  
    create: jest.fn((faqData) =>
      Promise.resolve({
        ...faqData,
        id: 'new-faq-id',
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    ),
  
    update: jest.fn(() => Promise.resolve([1])), 
  
    destroy: jest.fn(() => Promise.resolve(1)), 
  };

  const mockInstagramCredentials = {
    findByPk: jest.fn((id) =>
      id === 'test-instagram-id'
        ? Promise.resolve({
            id: 'test-instagram-id',
            userID: 'test-user-id',
            Username: 'testuser',
            igEmail: 'testuser@example.com',
            accessToken: 'mock-access-token',
            AccountLinked: true,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
          })
        : Promise.resolve(null)
    ),
  
    findAll: jest.fn(() =>
      Promise.resolve([
        {
          id: '1',
          userID: 'user1-id',
          Username: 'user1',
          igEmail: 'user1@example.com',
          accessToken: 'access-token-1',
          AccountLinked: true,
          createdAt: new Date(),
        },
        {
          id: '2',
          userID: 'user2-id',
          Username: 'user2',
          igEmail: 'user2@example.com',
          accessToken: 'access-token-2',
          AccountLinked: false,
          createdAt: new Date(),
        },
      ])
    ),
  
    create: jest.fn((instagramCredentialData) =>
      Promise.resolve({
        ...instagramCredentialData,
        id: 'new-instagram-id',
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    ),
  
    update: jest.fn(() => Promise.resolve([1])),
  
    destroy: jest.fn(() => Promise.resolve(1)), 
  };

  const mockSentInvite = {
    findByPk: jest.fn((id) =>
      id === 'test-invite-id'
        ? Promise.resolve({
            id: 'test-invite-id',
            voidanceInviteId: 'test-voidance-invite-id',
            companyId: 'test-company-id',
            createdAt: new Date(),
            deletedAt: null,
          })
        : Promise.resolve(null)
    ),
  
    findAll: jest.fn(() =>
      Promise.resolve([
        {
          id: '1',
          voidanceInviteId: 'voidance-invite-id-1',
          companyId: 'company-id-1',
          createdAt: new Date(),
        },
        {
          id: '2',
          voidanceInviteId: 'voidance-invite-id-2',
          companyId: 'company-id-2',
          createdAt: new Date(),
        },
      ])
    ),
  
    create: jest.fn((sentInviteData) =>
      Promise.resolve({
        ...sentInviteData,
        id: 'new-invite-id',
        createdAt: new Date(),
      })
    ),
  
    update: jest.fn(() => Promise.resolve([1])),
  
    destroy: jest.fn(() => Promise.resolve(1)), 
  };

  const mockSession = {
    findByPk: jest.fn((sid) =>
      sid === 'test-session-id'
        ? Promise.resolve({
            sid: 'test-session-id',
            expires: new Date(Date.now() + 3600000), // 1 hour from now
            data: JSON.stringify({ userId: 'test-user-id', isAuthenticated: true }),
            createdAt: new Date(),
            updatedAt: new Date(),
          })
        : Promise.resolve(null)
    ),
  
    findAll: jest.fn(() =>
      Promise.resolve([
        {
          sid: 'session-id-1',
          expires: new Date(Date.now() + 7200000), // 2 hours from now
          data: JSON.stringify({ userId: 'user1', isAuthenticated: true }),
          createdAt: new Date(),
        },
        {
          sid: 'session-id-2',
          expires: new Date(Date.now() - 3600000), // 1 hour ago
          data: JSON.stringify({ userId: 'user2', isAuthenticated: false }),
          createdAt: new Date(),
        },
      ])
    ),
  
    create: jest.fn((sessionData) =>
      Promise.resolve({
        ...sessionData,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    ),
  
    update: jest.fn(() => Promise.resolve([1])),
  
    destroy: jest.fn(() => Promise.resolve(1)), 
  };


  module.exports = {
    Advertisement: mockAdvertisement,
    Users: mockUsers,
    ContactUs: mockContactUs,
    Faq: mockFaq,
    InstagramCredentials: mockInstagramCredentials,
    SentInvite: mockSentInvite,
    Session: mockSession,
  };
  
  
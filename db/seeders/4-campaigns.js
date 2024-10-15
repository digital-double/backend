const { Sequelize } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
     // Fetch company IDs from the "Companies" table
     const companyIds = await queryInterface.sequelize.query(
        `SELECT id FROM "Company";`
      );
  
      // companyIds[0] contains the actual rows of companies
      const companyRows = companyIds[0]; // Extract the data rows
  
      // Insert data for company admins linked to the fetched company IDs
    await queryInterface.bulkInsert('Campaigns', [
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        companyID: companyRows[0].id,
        title: 'Winter Wonderland',
        likes: 1200,
        description: 'A campaign focused on winter-themed promotions.',
        totalBudget: 10000.00,
        campaignStatus: true,
        campaignStart: new Date('2024-11-01'),
        campaignEnd: new Date('2024-12-31'),
        avgCPC: 1.25,
        numOfAds: 5,
        numOfConversions: 200,
        numOfModels: 8,
        potentialReach: 100000,
        potentialEngagement: 8000,
        actualEngagement: 6000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        companyID: companyRows[1].id,
        title: 'Spring Forward',
        likes: 900,
        description: 'A fresh campaign welcoming the spring season.',
        totalBudget: 8000.00,
        campaignStatus: false,
        campaignStart: new Date('2025-03-01'),
        campaignEnd: new Date('2025-03-31'),
        avgCPC: 1.50,
        numOfAds: 4,
        numOfConversions: 180,
        numOfModels: 6,
        potentialReach: 75000,
        potentialEngagement: 5000,
        actualEngagement: 4500,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        companyID: companyRows[2].id,
        title: 'Summer Splash',
        likes: 1500,
        description: 'Exciting summer offers and promotions.',
        totalBudget: 15000.00,
        campaignStatus: true,
        campaignStart: new Date('2025-06-01'),
        campaignEnd: new Date('2025-07-31'),
        avgCPC: 1.75,
        numOfAds: 7,
        numOfConversions: 300,
        numOfModels: 10,
        potentialReach: 150000,
        potentialEngagement: 12000,
        actualEngagement: 10000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Campaigns', null, {});
  }
};

const { Sequelize } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Fetch company IDs from the "Companies" table
    const campaignIds = await queryInterface.sequelize.query(
      `SELECT id FROM "Campaigns";`
    );

    // companyIds[0] contains the actual rows of companies
    const campaignRows = campaignIds[0]; // Extract the data rows

    // Insert data for company admins linked to the fetched company IDs
    await queryInterface.bulkInsert('Advertisements', [
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        campaignID: campaignRows[0].id,
        title: 'Summer Sale 2024',
        Status: true,
        adStart: new Date('2024-06-01'),
        adEnd: new Date('2024-06-30'),
        alocatedBudget: 5000.00,
        spentBudget: 2500.00,
        conversions: 150,
        leads: 200,
        avgCPC: 2.50,
        totalLikes: 300,
        totalComments: 45,
        description: 'A promotional campaign for the summer season.',
        numOfModels: 3,
        potentialReach: 50000,
        fileName: 'summer_sale.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        campaignID: campaignRows[0].id,
        title: 'Back to School',
        Status: false,
        adStart: new Date('2024-08-01'),
        adEnd: new Date('2024-08-31'),
        alocatedBudget: 7000.00,
        spentBudget: 4500.00,
        conversions: 200,
        leads: 250,
        avgCPC: 3.00,
        totalLikes: 450,
        totalComments: 70,
        description: 'Back to school promotions for students and parents.',
        numOfModels: 5,
        potentialReach: 80000,
        fileName: 'back_to_school.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        campaignID: campaignRows[0].id,
        title: 'Holiday Discounts',
        Status: true,
        adStart: new Date('2024-12-01'),
        adEnd: new Date('2024-12-31'),
        alocatedBudget: 10000.00,
        spentBudget: 6000.00,
        conversions: 300,
        leads: 400,
        avgCPC: 2.75,
        totalLikes: 600,
        totalComments: 90,
        description: 'Exclusive discounts for the holiday season.',
        numOfModels: 4,
        potentialReach: 120000,
        fileName: 'holiday_discounts.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Advertisements', null, {});
  }
};

const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const uploadsDir = path.resolve(__dirname, '../uploads');

    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir);
    }

    const placeholderImages = [
      { name: 'User One', imageName: 'user1.jpg' },
      { name: 'User Two', imageName: 'user2.jpg' },
      { name: 'User Three', imageName: 'user3.jpg' },
    ];

    for (const placeholder of placeholderImages) {
      const filePath = path.join(uploadsDir, placeholder.imageName);
      fs.writeFileSync(filePath, 'This is a placeholder image content'); 
    }

    const campaignIds = await queryInterface.sequelize.query(
      `SELECT id FROM "campaigns";`
    );

    const campaignRows = campaignIds[0]; 


    await queryInterface.bulkInsert('advertisements', [
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        campaignID: campaignRows[0].id,
        title: 'Summer Sale 2024',
        Status: true,
        adStart: new Date('2024-06-01'),
        adEnd: new Date('2024-06-30'),
        minFollower: 500,
        gender: 'male',
        minAge: 22,
        maxAge: 40,
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
        name: "User One",
        imagePath: 'uploads/user1.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        campaignID: campaignRows[1].id,
        title: 'Back to School',
        Status: false,
        adStart: new Date('2024-08-01'),
        adEnd: new Date('2024-08-31'),
        maxFollower: 10000,
        gender: 'female',
        maxAge: 50,
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
        name: "User Two",
        imagePath: 'uploads/user2.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        campaignID: campaignRows[2].id,
        title: 'Holiday Discounts',
        Status: true,
        adStart: new Date('2024-12-01'),
        adEnd: new Date('2024-12-31'),
        gender: 'any',
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
        name: "User Three",
        imagePath: 'uploads/user3.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('advertisements', null, {});
    const uploadsDir = path.resolve(__dirname, '../uploads');
    fs.rmSync(uploadsDir, { recursive: true, force: true });
  }
};

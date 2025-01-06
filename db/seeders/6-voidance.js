const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');

module.exports = {
  up: async (queryInterface) => {
    const uploadsDir = path.resolve(__dirname, '../uploads');
    
        if (!fs.existsSync(uploadsDir)) {
          fs.mkdirSync(uploadsDir);
        }
    
        const placeholderImages = [
          { name: 'vd One', imageName: 'vd1.jpg' },
          { name: 'vd Two', imageName: 'vd2.jpg' },
          { name: 'vd Three', imageName: 'vd3.jpg' },
        ];
    
        for (const placeholder of placeholderImages) {
          const filePath = path.join(uploadsDir, placeholder.imageName);
          fs.writeFileSync(filePath, 'This is a placeholder image content'); 
        }

     const userIds = await queryInterface.sequelize.query(
        `SELECT id FROM "users";`
      );
      const companyIds = await queryInterface.sequelize.query(
        `SELECT id FROM "companies";`
      );
      const advertisementIds = await queryInterface.sequelize.query(
        `SELECT id FROM "advertisements";`
      );
      
      const advertisementRows = advertisementIds[0];
      const companyRows = companyIds[0]; 
      const userRows = userIds[0]; 
  
    await queryInterface.bulkInsert('voidances', [
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        userID: userRows[0].id,
        advertisementID: advertisementRows[0].id,
        companyID: companyRows[0].id,
        name: "vd One",
        imagePath: 'uploads/vd1.jpg',
        qualityScore: 85.5,
        uploadStatus: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        userID: userRows[1].id,
        advertisementID: advertisementRows[1].id,
        companyID: companyRows[1].id,
        name: "vd Two",
        imagePath: 'uploads/vd2.jpg',
        qualityScore: 90.0,
        uploadStatus: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        userID: userRows[2].id,
        advertisementID: advertisementRows[2].id,
        companyID: companyRows[2].id,
        name: "vd three",
        imagePath: 'uploads/vd3.jpg',
        qualityScore: 78.3,
        uploadStatus: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('voidances', null, {});
  },
};

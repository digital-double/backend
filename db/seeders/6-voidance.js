const { Sequelize } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
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
        fileType: 'image/jpeg',
        fileLength: '3MB',
        fileName: 'sample_image1.jpg',
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
        fileType: 'video/mp4',
        fileLength: '15MB',
        fileName: 'sample_video.mp4',
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
        fileType: 'application/pdf',
        fileLength: '1MB',
        fileName: 'sample_document.pdf',
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

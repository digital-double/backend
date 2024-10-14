const { Sequelize } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
     const userIds = await queryInterface.sequelize.query(
        `SELECT id FROM "User";`
      );
      const companyIds = await queryInterface.sequelize.query(
        `SELECT id FROM "Company";`
      );
      const advertisementIds = await queryInterface.sequelize.query(
        `SELECT id FROM "Advertisements";`
      );
      
      const advertisementRows = advertisementIds[0];
      const companyRows = companyIds[0]; 
      const userRows = userIds[0]; 
  
    await queryInterface.bulkInsert('Voidances', [
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        userID: userRows[0].id,
        advertisementID: advertisementRows[0].id,
        companyID: companyRows[0].id,
        affiliatedLink: 'https://example.com/link1',
        numbOfClicks: 123,
        fileType: 'image/jpeg',
        fileLength: '3MB',
        fileName: 'sample_image1.jpg',
        qualityScore: 85.5,
        UploadStatus: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        userID: userRows[1].id,
        advertisementID: advertisementRows[1].id,
        companyID: companyRows[1].id,
        affiliatedLink: 'https://example.com/link2',
        numbOfClicks: 76,
        fileType: 'video/mp4',
        fileLength: '15MB',
        fileName: 'sample_video.mp4',
        qualityScore: 90.0,
        UploadStatus: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        userID: userRows[2].id,
        advertisementID: advertisementRows[2].id,
        companyID: companyRows[2].id,
        affiliatedLink: 'https://example.com/link3',
        numbOfClicks: 45,
        fileType: 'application/pdf',
        fileLength: '1MB',
        fileName: 'sample_document.pdf',
        qualityScore: 78.3,
        UploadStatus: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Voidances', null, {});
  },
};

const { Sequelize } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
     const userIds = await queryInterface.sequelize.query(
        `SELECT id FROM "Users";`
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
        userId: userRows[0].id,
        advertisementId: advertisementRows[0].id,
        companyId: companyRows[0].id,
        affiliatedLink: 'https://example.com/link1',
        numbOfClicks: 123,
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
        userId: userRows[1].id,
        advertisementId: advertisementRows[1].id,
        companyId: companyRows[1].id,
        affiliatedLink: 'https://example.com/link2',
        numbOfClicks: 76,
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
        userId: userRows[2].id,
        advertisementId: advertisementRows[2].id,
        companyId: companyRows[2].id,
        affiliatedLink: 'https://example.com/link3',
        numbOfClicks: 45,
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
    await queryInterface.bulkDelete('Voidances', null, {});
  },
};

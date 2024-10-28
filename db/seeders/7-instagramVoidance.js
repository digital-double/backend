const { Sequelize } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Fetch user IDs from the "Users" table
    const userIds = await queryInterface.sequelize.query(
        `SELECT id FROM "Users";`
      );
  
      // userIds[0] contains the actual rows of users
      const userRows = userIds[0]; // Extract the data rows
  
      // Insert facial data linked to the fetched users
    await queryInterface.bulkInsert('InstagramVoidances', [
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        userID: userRows[0].id,
        fileType: 'image/jpeg',
        fileLength: '2MB',
        fileName: 'holiday_photo.jpg',
        description: 'Link in Bio cluster mucks!',
        uploadDate: new Date('2024-07-15'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        userID: userRows[1].id,
        fileType: 'video/mp4',
        fileLength: '15MB',
        fileName: 'workout_video.png',
        description: 'Workout or be a fat muck!',
        uploadDate: new Date('2024-08-10'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        userID: userRows[2].id,
        fileType: 'image/png',
        fileLength: '1MB',
        fileName: 'birthday_party.png',
        description: 'I went naked to my birthday like a muck!',
        uploadDate: new Date('2024-09-05'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('InstagramVoidances', null, {});
  }
};

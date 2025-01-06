const { Sequelize } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const userIds = await queryInterface.sequelize.query(
      `SELECT id FROM "users";`
    );
    
    const userRows = userIds[0];
    await queryInterface.bulkInsert('instagram_datas', [
      {
        id: queryInterface.sequelize.literal('uuid_generate_v4()'),
        userID: userRows[1].id,
        Username: 'user_instagram_1',
        igEmail: 'user1@instagram.com',
        accessToken: 'sample_access_token_1',
        AccountLinked: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: queryInterface.sequelize.literal('uuid_generate_v4()'),
        userID: userRows[2].id,
        Username: 'user_instagram_2',
        igEmail: 'user2@instagram.com',
        accessToken: 'sample_access_token_2',
        AccountLinked: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('instagram_datas', null, {});
  },
};

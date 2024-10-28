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
    await queryInterface.bulkInsert("FacialData", [
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        userID: userRows[0].id,
        facialImage: "https://example.com/facial_image_1.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        userID: userRows[1].id,
        facialImage: "https://example.com/facial_image_2.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        userID: userRows[2].id,
        facialImage: "https://example.com/facial_image_2.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("FacialData", null, {});
  },
};

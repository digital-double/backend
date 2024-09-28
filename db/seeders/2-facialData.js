module.exports = {
  up: async (queryInterface, Sequelize) => {
    const userIds = await queryInterface.sequelize.query(
      `SELECT id from "Users";`
    );

    await queryInterface.bulkInsert("FacialData", [
      {
        userID: userRows[0].id,
        facialImage: "https://example.com/facial_image_1.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userID: userRows[1].id,
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

const bcrypt = require("bcrypt");
const { Sequelize } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    // Fetch company IDs from the "Companies" table
    const companyIds = await queryInterface.sequelize.query(
      `SELECT id FROM "companies";`
    );
    const userIds= await queryInterface.sequelize.query(
      `SELECT id FROM "users";`
    )

    const companyRows = companyIds[0]; 
    const userRows = userIds[0];


    await queryInterface.bulkInsert("company_admins", [
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        companyID: companyRows[0].id,
        userID: userRows[0].id,
        adminName: "omar",
        email: "omar.badawy@covelant.com",
        accessRights: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        companyID: companyRows[1].id,
        userID: userRows[1].id,
        adminName: "ignazio",
        email: "ignazio@covelant.com",
        accessRights: "member",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("company_admins", null, {});
  },
};


const bcrypt = require("bcrypt");
const { Sequelize } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    // Fetch company IDs from the "Companies" table
    const companyIds = await queryInterface.sequelize.query(
      `SELECT id FROM "Company";`
    );
    const userIds= await queryInterface.sequelize.query(
      `SELECT id FROM "Users";`
    )

    const companyRows = companyIds[0]; 
    const userRows = userIds[0];


    await queryInterface.bulkInsert("CompanyAdmin", [
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        companyID: companyRows[0].id,
        userID: userRows[0].id,
        adminName: "masterChief",
        email: "omar.badawy@digitaldouble.com",
        accessRights: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        companyID: companyRows[1].id,
        userID: userRows[1].id,
        adminName: "ignazio",
        email: "ignazio@digitaldouble.com",
        accessRights: "member",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("CompanyAdmin", null, {});
  },
};


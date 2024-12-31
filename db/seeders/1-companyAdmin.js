const bcrypt = require("bcrypt");
const { Sequelize } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    // Fetch company IDs from the "Companies" table
    const companyIds = await queryInterface.sequelize.query(
      `SELECT id FROM "companies";`
    );

    const companyRows = companyIds[0]; 


    await queryInterface.bulkInsert("company_admins", [
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        companyID: companyRows[0].id,
        adminName: "admin1",
        email: "admin1@covelant.com",
        passwordHash: await bcrypt.hash('admin1', 12),
        accessRights: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        companyID: companyRows[1].id,
        adminName: "admin2",
        email: "admin2@covelant.com",
        passwordHash: await bcrypt.hash('admin2', 12),
        accessRights: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        companyID: companyRows[2].id,
        adminName: "admin3",
        email: "admin3@covelant.com",
        passwordHash: await bcrypt.hash('admin3', 12),
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


const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface) => {
    const companyIds = await queryInterface.sequelize.query(
      `SELECT id from "Companies";`
    );

    await queryInterface.bulkInsert("CompanyAdmin", [
      {
        companyID: companyRows[0].id,
        email: "admin1@company1.com",
        password: await bcrypt.hash("adminPassword1", 12),
        accessRights: "full",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        companyID: companyRows[1].id,
        email: "admin2@company2.com",
        password: await bcrypt.hash("adminPassword2", 12),
        accessRights: "limited",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("CompanyAdmin", null, {});
  },
};

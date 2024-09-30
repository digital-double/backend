const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface) => {
    // Fetch company IDs from the "Companies" table
    const companyIds = await queryInterface.sequelize.query(
      `SELECT id FROM "Companies";`
    );

    // companyIds[0] contains the actual rows of companies
    const companyRows = companyIds[0]; // Extract the data rows

    // Insert data for company admins linked to the fetched company IDs
    await queryInterface.bulkInsert("CompanyAdmin", [
      {
        companyID: companyRows[0].id,
        adminName: "masterChief",
        email: "admin1@company1.com",
        password: await bcrypt.hash("adminPassword1", 12), 
        accessRights: "full",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        companyID: companyRows[1].id,
        adminName: "gorgon",
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


const bcrypt = require('bcrypt');
const { Sequelize } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {

    const companyAdminIds = await queryInterface.sequelize.query(
      `SELECT id FROM "company_admins";`
    );

    const companyAdminRows = companyAdminIds[0]; 

    await queryInterface.bulkInsert('users', [
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        companyAdminID: companyAdminRows[0].id,
        userName: 'Omar_Badawy',
        email: 'omar.badawy@covelant.com',
        name: "omar",
        passwordHash: await bcrypt.hash('omar', 12),
        isCompany: true,
      },
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        companyAdminID: companyAdminRows[1].id,
        userName: 'masterignazio69',
        email: 'ignazio@covelant.com',
        name:"ignazio",
        passwordHash: await bcrypt.hash('ignazio', 12),
        isCompany: false,
      },
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        companyAdminID: null,
        userName: 'NicoBiko',
        email: 'NicoBiko@covelant.com',
        name:"nico",
        passwordHash: await bcrypt.hash('nico', 12),
        isCompany: false,
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
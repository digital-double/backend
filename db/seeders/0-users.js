const bcrypt = require('bcrypt');
const { Sequelize } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {

    await queryInterface.bulkInsert('Users', [
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        userName: 'Omar_Badawy',
        email: 'omar.badawy@covelant.com',
        name: "omar",
        passwordHash: await bcrypt.hash('omar', 12),
        isCompany: true,
      },
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        userName: 'masterignazio69',
        email: 'ignazio@covelant.com',
        name:"ignazio",
        passwordHash: await bcrypt.hash('ignazio', 12),
        isCompany: false,
      },
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        userName: 'NicoBiko',
        email: 'NicoBiko@covelant.com',
        name:"nico",
        passwordHash: await bcrypt.hash('nico', 12),
        isCompany: false,
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
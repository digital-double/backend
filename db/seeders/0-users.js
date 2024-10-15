const bcrypt = require('bcrypt');
const { Sequelize } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {

    await queryInterface.bulkInsert('User', [
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        userName: 'Omar_Badawy',
        email: 'omar.badawy@digitaldouble.com',
        name: "omar",
        password: await bcrypt.hash('OmarBadawy', 12),
      },
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        userName: 'masterignazio69',
        email: 'ignazio@digitaldouble.com',
        name:"ignazio",
        password: await bcrypt.hash('ignazio', 12),
      },
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        userName: 'NicoBiko',
        email: 'NicoBiko@digitaldouble.com',
        name:"nico",
        password: await bcrypt.hash('nico', 12),
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('User', null, {});
  },
};
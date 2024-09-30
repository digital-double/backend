const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface) => {

    await queryInterface.bulkInsert('Users', [
      {
        userName: 'Omar_Badawy',
        email: 'omar.badawy@digitaldouble.com',
        name: "omar",
        passwordHash: await bcrypt.hash('OmarBadawy', 12),
      },
      {
        userName: 'masterignazio69',
        email: 'ignazio@digitaldouble.com',
        name:"ignazio",
        passwordHash: await bcrypt.hash('ignazio', 12),
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
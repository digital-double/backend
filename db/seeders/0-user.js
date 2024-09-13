const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface) => {
    const walletIds = await queryInterface.sequelize.query(
      `SELECT id from "UserAccount";`
    );

    await queryInterface.bulkInsert('User', [
      {
        userName: 'Omar_Badawy',
        email: 'omar.badawy@digitaldouble.com',
        name: "omar",
        passwordHash: await bcrypt.hash('OmarBadawy', 12),
        verified: true,
      },
      {
        userName: 'masterignazio69',
        email: 'ignazio@digitaldouble.com',
        name:"ignazio",
        passwordHash: await bcrypt.hash('ignazio', 12),
        verified: true,
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('User', null, {});
  },
};
const bcrypt = require("bcrypt");
const { Sequelize } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedIPs = [
      await bcrypt.hash("192.168.0.1", 10),
      await bcrypt.hash("192.168.0.2", 10),
      await bcrypt.hash("192.168.0.3", 10),
    ];

    const affiliateIds = await queryInterface.sequelize.query(
      `SELECT id FROM "affiliate_links";`
    );

    const affiliateRows = affiliateIds[0]; 

    await queryInterface.bulkInsert("referral_ips", [
      {
        id: queryInterface.sequelize.literal('uuid_generate_v4()'),
        affiliateLinkID: affiliateRows[0].id,
        hashedIPAddress: hashedIPs[0],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: queryInterface.sequelize.literal('uuid_generate_v4()'),
        affiliateLinkID: affiliateRows[0].id,
        hashedIPAddress: hashedIPs[1],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: queryInterface.sequelize.literal('uuid_generate_v4()'),
        affiliateLinkID: affiliateRows[0].id,
        hashedIPAddress: hashedIPs[2],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("referral_ips", null, {});
  },
};

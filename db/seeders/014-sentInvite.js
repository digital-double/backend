module.exports = {
  up: async (queryInterface, Sequelize) => {
    const vdInviteIds = await queryInterface.sequelize.query(
      `SELECT id FROM "voidance_invites";`
    );
    const companyIds = await queryInterface.sequelize.query(
      `SELECT id FROM "companies";`
    );

    const vdInviteRows = vdInviteIds[0];
    const companyRows = companyIds[0];
    
    await queryInterface.bulkInsert("sent_invites", [
      {
        id: queryInterface.sequelize.literal('uuid_generate_v4()'),
        voidanceInviteID: vdInviteRows[0].id,
        companyID: companyRows[0].id,
        createdAt: new Date(),
        deletedAt: null,
      },
      {
        id: queryInterface.sequelize.literal('uuid_generate_v4()'),
        voidanceInviteID: vdInviteRows[1].id,
        companyID: companyRows[1].id,
        createdAt: new Date(),
        deletedAt: null,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("sent_invites", null, {});
  },
};

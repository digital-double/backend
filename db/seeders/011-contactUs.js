module.exports = {
  up: async (queryInterface, Sequelize) => {
    const companyIds = await queryInterface.sequelize.query(
      `SELECT id FROM "companies";`
    );
    const userIds = await queryInterface.sequelize.query(
      `SELECT id FROM "users";`
    );
    
    const userRows = userIds[0]; 
    const companyRows = companyIds[0]; 

    await queryInterface.bulkInsert('contact_us', [
      {
        id: queryInterface.sequelize.literal('uuid_generate_v4()'),
        userID: userRows[0].id,
        companyID: companyRows[0].id,
        subject: 'Request to backflip',
        message: 'I would like to know more about your backflip services.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: queryInterface.sequelize.literal('uuid_generate_v4()'),
        userID: userRows[1].id,
        companyID: companyRows[1].id,
        subject: 'Request for stealing cats',
        message: 'We are interested in partnering with a dog to steal the company cat',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('contact_us', null, {});
  },
};

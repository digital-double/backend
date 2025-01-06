module.exports = {
  up: async (queryInterface, Sequelize) => {
    const voidacesIds = await queryInterface.sequelize.query(
        `SELECT id FROM "voidances";`
      );

      const voidaceRows = voidacesIds[0]; 

    await queryInterface.bulkInsert('affiliate_links', [
      {
        id: queryInterface.sequelize.literal('uuid_generate_v4()'),
        voidanceID: voidaceRows[0].id,
        link: 'http://example.com/affiliate/test1',
        redirectTo: 'https://www.youtube.com/watch?v=M6ZZKNPrSPw&ab_channel=VibeMusic',
        clicks: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: queryInterface.sequelize.literal('uuid_generate_v4()'),
        voidanceID: voidaceRows[1].id,
        link: 'http://example.com/affiliate/test2',
        redirectTo: 'https://www.youtube.com/watch?v=wB0mYyUQfzw&list=RDwB0mYyUQfzw&start_radio=1&ab_channel=Loaf',
        clicks: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: queryInterface.sequelize.literal('uuid_generate_v4()'),
        voidanceID: voidaceRows[2].id,
        link: 'http://example.com/affiliate/test3',
        redirectTo: 'https://www.youtube.com/watch?v=TWJVgTeNljs&list=RDTWJVgTeNljs&start_radio=1',
        clicks: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('affiliate_links', null, {});
  },
};

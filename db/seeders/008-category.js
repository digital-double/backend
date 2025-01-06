module.exports = {
    up: async (queryInterface) => {
      await queryInterface.bulkInsert('categories', [
        {
          id: queryInterface.sequelize.literal('uuid_generate_v4()'),
          type: 'Technology',
          description: 'Latest trends and news in tech',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: queryInterface.sequelize.literal('uuid_generate_v4()'),
          type: 'Shopping',
          description: 'E-commerce and retail updates',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: queryInterface.sequelize.literal('uuid_generate_v4()'),
          type: 'Fashion',
          description: 'Trends and news in fashion',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: queryInterface.sequelize.literal('uuid_generate_v4()'),
          type: 'Art',
          description: 'Art exhibitions and culture',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    },
  
    down: async (queryInterface) => {
      await queryInterface.bulkDelete('categories', null, {});
    },
  };
  
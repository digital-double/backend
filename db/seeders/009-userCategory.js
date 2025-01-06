module.exports = {
    up: async (queryInterface) => {
        const userIds = await queryInterface.sequelize.query(
            `SELECT id FROM "users";`
          );
          const categoryIds = await queryInterface.sequelize.query(
            `SELECT id FROM "categories";`
          );

          const userRows = userIds[0]; 
          const categoryRows = categoryIds[0]; 
      await queryInterface.bulkInsert('user_categories', [
        {
          id: queryInterface.sequelize.literal('uuid_generate_v4()'),
          userID: userRows[0].id,
          categoryID: categoryRows[0].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: queryInterface.sequelize.literal('uuid_generate_v4()'),
          userID: userRows[1].id,
          categoryID: categoryRows[1].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: queryInterface.sequelize.literal('uuid_generate_v4()'),
          userID: userRows[2].id,
          categoryID: categoryRows[2].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    },
  
    down: async (queryInterface) => {
      await queryInterface.bulkDelete('user_categories', null, {});
    },
  };
  
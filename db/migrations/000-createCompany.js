const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    `);

    await queryInterface.createTable('companies', {
      id: {
        type: DataTypes.UUID, // Change from INTEGER to UUID
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        primaryKey: true,
        allowNull: false,
      },
      stripeId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      accountId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      companyName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      userName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      logo: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      banner: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      websiteUrl: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      industry: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      verification: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      numOfRunningAds: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      bankName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      bankAccName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      bankAccNo: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      bankRoutingNo: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      paypalAcc: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      bankIban: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      bankPaymentStatus: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      DROP EXTENSION IF EXISTS "uuid-ossp";
    `);
    await queryInterface.dropTable('companies');
  }
};

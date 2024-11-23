const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Ensure the extension for UUID generation is created
    await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

    await queryInterface.createTable('Company', {
      id: {
        type: DataTypes.UUID, // Change from INTEGER to UUID
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
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
    await queryInterface.dropTable('Company');
  }
};

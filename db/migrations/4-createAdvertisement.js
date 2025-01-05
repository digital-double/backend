const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('advertisements', {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
      },
      campaignID: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'campaigns',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      title: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      Status: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      adStart: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      adEnd: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      minFollower: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: true,
      },
      maxFollower:{
        type: Sequelize.INTEGER,
        defaultValue: 1000000,
        allowNull: true,
      },
      gender: {
        type: Sequelize.STRING,
        defaultValue: "any",
        allowNull: true,
      },
      minAge: {
        type: Sequelize.INTEGER,
        defaultValue: 18,
        allowNull: true,
      },
      maxAge: {
        type: Sequelize.INTEGER,
        defaultValue: 100,
        allowNull: true,
      },
      alocatedBudget: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      spentBudget: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      conversions: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      leads: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      avgCPC: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      totalLikes: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      totalComments: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      numOfModels: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      potentialReach: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      imagePath: {
        type: Sequelize.STRING,
        allowNull: false,
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
    await queryInterface.dropTable('advertisements');
  }
};

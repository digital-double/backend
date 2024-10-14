const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Advertisements', {
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
          model: 'Campaigns',
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
      fileName: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('Advertisements');
  }
};

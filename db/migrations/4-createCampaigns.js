const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Campaign', {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
      },
      companyID: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'Company',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      title: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      likes: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      totalBudget: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      campaignStatus: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      campaignStart: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      campaignEnd: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      avgCPC: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      numOfAds: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      numOfConversions: {
        type: Sequelize.INTEGER,
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
      potentialEngagement: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      actualEngagement: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('Campaign');
  }
};

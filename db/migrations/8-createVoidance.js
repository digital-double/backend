const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Voidances', {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        allowNull: false,
      },
      userID: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      advertisementID: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'Advertisements',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
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
      affiliatedLink: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      numbOfClicks: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      fileType: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      fileLength: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      fileName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      qualityScore: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      UploadStatus: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('Voidances');
  },
};

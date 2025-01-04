const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('voidances', {
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
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      advertisementID: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'advertisements',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      companyID: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'companies',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
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
      uploadStatus: {
        type: DataTypes.ENUM('pending', 'processing', 'completed', 'failed'),
        defaultValue: 'pending',
        allowNull: false,
      },
      campaignName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      CPC: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      createdFromInvite: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      subject: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      message: {
        type: DataTypes.STRING,
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
    await queryInterface.dropTable('voidances');
  }
};

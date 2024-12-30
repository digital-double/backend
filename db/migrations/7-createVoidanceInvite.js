const { DataTypes } = require('sequelize'); // Import DataTypes

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('voidance_invites', {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      userID: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'users', // Name of the Users table
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      companyID: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'companies', // Name of the Company table
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      advertisementID: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'advertisements', // Name of the Advertisement table
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      subject: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      message: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      CPC: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      campaignName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('NOW()'),
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('NOW()'),
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM(
          'pending_user',
          'pending_company',
          'accepted',
          'declined'
        ),
        allowNull: false,
        defaultValue: 'pending_user',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('voidance_invites');
  },
};


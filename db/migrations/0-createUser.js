const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
      'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";'
    );
    await queryInterface.createTable('User', {
      id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        primaryKey: true,
        allowNull: false,
      },
      userName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      passwordHash: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      avatar: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: 'https://pbs.twimg.com/media/FB6YhR8WQAI5MnM.png', // remove this later
      },
      address: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      country: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      city: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      banned: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      engagementScore: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: false,
      },
      balance: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.fn('now'),
      },
    });
    await queryInterface.addConstraint('User', {
      fields: ['email'],
      type: 'unique',
    });
    await queryInterface.addConstraint('User', {
      fields: ['userName'],
      type: 'unique',
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('User');
  },
};
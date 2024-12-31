const { DataTypes } = require("sequelize");


module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Ensure the extension for UUID generation is created
    await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

    await queryInterface.createTable('company_admins', {
      id: {
        type: DataTypes.UUID, 
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      adminName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      role: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      companyID: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'companies', 
          key: 'id',          
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      passwordHash: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      accessRights: {
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
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('company_admins');
  }
};

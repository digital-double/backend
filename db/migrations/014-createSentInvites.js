module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Ensure the extension for UUID generation is created
    await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

    await queryInterface.createTable("sent_invites", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.literal("uuid_generate_v4()"),
        allowNull: false,
      },
      voidanceInviteID: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: "voidance_invites",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      companyID: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: "companies",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      createdAt: {
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
    await queryInterface.dropTable("sent_invites");
  },
};


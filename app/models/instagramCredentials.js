const Sequelize = require("sequelize");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class InstagramCredentials extends Model {
    static associate(model) {
      InstagramCredentials.belongsTo(model.User, { foreignKey: "userID" });
    }
  }

  InstagramCredentials.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        validate: {
          isUUID: 4,
        },
        defaultValue: Sequelize.literal("uuid_generate_v4()"),
      },
      userID: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
        references: {
          model: "Users",
          key: "id",
        },
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      igEmail: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      accessToken: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      accountLinked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "InstagramCredentials",
      paranoid: true,
      timestamps: true,
    }
  );

  return InstagramCredentials;
};

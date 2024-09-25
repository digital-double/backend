const Sequelize = require("sequelize");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class InstagramCredentials extends Model {
    static associate(model) {
      this.belongsTo(model.User, {
        foreignKey: {
          name: "userID",
          type: DataTypes.UUID,
        },
      });
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

const Sequelize = require("sequelize");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class FacialData extends Model {
    static associate(model) {
      this.belongsTo(model.Users, {
        foreignKey: {
          name: "userID",
          type: DataTypes.UUID,
        },
      });
    }
  }

  FacialData.init(
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
      facialImage: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "FacialData",
      paranoid: true,
      timestamps: true,
    }
  );

  return FacialData;
};

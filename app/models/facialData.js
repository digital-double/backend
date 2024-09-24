const Sequelize = require("sequelize");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class FacialData extends Model {
    static associate(model) {
      FacialData.belongsTo(model.User, { foreignKey: "userID" });
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
        references: {
          model: "Users",
          key: "id",
        },
      },
      facialImage: {
        type: DataTypes.STRING,
        allowNull: false,
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

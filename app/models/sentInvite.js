const Sequelize = require("sequelize");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class SentInvite extends Model {
    static associate(models) {
      SentInvite.belongsTo(models.VoidanceInvite, {
        foreignKey: "voidanceInviteID",
      });
      SentInvite.belongsTo(models.Advertisement, {
        foreignKey: "companyID",
      });
    }
  }

  SentInvite.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        validate: {
          isUUID: 4,
        },
        defaultValue: Sequelize.literal("uuid_generate_v4()"),
      },
      voidanceInviteID: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "VoidanceInvites",
          key: "id",
        },
      },
      companyID: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Advertisements",
          key: "id",
        },
      },
      createdAt: DataTypes.DATE,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "SentInvite",
      paranoid: true,
      timestamps: true,
    }
  );

  return SentInvite;
};

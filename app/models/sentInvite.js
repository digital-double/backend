const Sequelize = require("sequelize");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class SentInvite extends Model {
    static associate(models) {
      this.belongsTo(models.VoidanceInvite, {
        foreignKey: {
          name: "voidanceInviteID",
          type: DataTypes.UUID,
        },
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
          model: 'VoidanceInvite', 
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      companyID: {
        type: DataTypes.UUID,
        allowNull: false,
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

const { Model } = require('sequelize');
const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class VoidanceInvite extends Model {
    static associate(models) {
      // Association with the User model
      VoidanceInvite.belongsTo(models.Users, {
        foreignKey: 'userID',
        as: 'user',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });

      // Association with the sentInvite model
      VoidanceInvite.hasMany(models.SentInvite, {
        foreignKey: 'companyID',
        as: 'company',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });
    }
  }

  VoidanceInvite.init(
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
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      companyID: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Company', 
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      acceptance: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'VoidanceInvite',
      timestamps: true,
      paranoid: true, // Enables soft deletion with `deletedAt`
    }
  );

  return VoidanceInvite;
};

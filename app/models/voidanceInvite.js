const { Model, DataTypes } = require('sequelize');
const Sequelize = require('sequelize');

'use strict';

module.exports = (sequelize) => {
  class VoidanceInvite extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'userID' });
      this.belongsTo(models.Advertisement, { foreignKey: 'advertisementID' });
    }
  }

  VoidanceInvite.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.literal('uuid_generate_v4()'),
    },
    userID: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users', 
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    advertisementID: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'advertisements', 
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
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
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('NOW()'),
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('NOW()'),
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM(
        'pending_user',
        'pending_company',
        'accepted',
        'declined'
      ),
      allowNull: false,
      defaultValue: 'pending_user',
    },
  }, {
    sequelize,
    modelName: 'VoidanceInvite',
    tableName: 'voidance_invites',
    paranoid: true,
    timestamps: true,
  });

  return VoidanceInvite;
};


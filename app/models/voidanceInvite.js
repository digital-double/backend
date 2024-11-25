const { Model, DataTypes } = require('sequelize');
const Sequelize = require('sequelize');

'use strict';

module.exports = (sequelize) => {
  class VoidanceInvite extends Model {
    static associate(models) {
      this.belongsTo(models.Users, { foreignKey: 'userId' });
      this.belongsTo(models.Company, { foreignKey: 'companyId' });
      this.belongsTo(models.Advertisement, { foreignKey: 'advertisementId' });
    }
  }

  VoidanceInvite.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.literal('uuid_generate_v4()'),
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users', 
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    companyId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Company', 
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    advertisementId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Advertisement', 
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
    paranoid: true,
    timestamps: true,
  });

  return VoidanceInvite;
};


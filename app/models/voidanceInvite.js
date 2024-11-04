const { Model } = require('sequelize');
const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
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
      validate: {
        isUUID: 4,
      },
      defaultValue: Sequelize.literal('uuid_generate_v4()'),
    },
    userId: {
      type:  DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    companyId: {
      type:  DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Company',
        key: 'id',
      },
    },
    advertisementId: {
      type:  DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Advertisement',
        key: 'id',
      },
    },
    subject: DataTypes.STRING,
    message: DataTypes.STRING,
    CPC: DataTypes.FLOAT,
    campaignName: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE,
    status: {
      type: DataTypes.ENUM(
        'pending_user',     // Waiting for user acceptance
        'pending_company',  // Waiting for company acceptance
        'accepted',
        'declined'
      ),
      defaultValue: 'pending_user',
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'VoidanceInvite',
    paranoid: true,
    timestamps: true,
  });

  return VoidanceInvite;
};

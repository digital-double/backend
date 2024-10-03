const { Model } = require('sequelize');
const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class VoidanceInvite extends Model {
    static associate(models) {
      this.belongsTo(models.Users, { foreignKey: 'userID' });
      this.belongsTo(models.Company, { foreignKey: 'companyID' });
      this.belongsTo(models.Advertisement, { foreignKey: 'advertisementID' });
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
    userID: {
      type:  DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    companyID: {
      type:  DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Company',
        key: 'id',
      },
    },
    advertisementID: {
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
    campaignName: DataTypes.BOOLEAN,
    acceptance: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'VoidanceInvite',
    paranoid: true,
    timestamps: true,
  });

  return VoidanceInvite;
};

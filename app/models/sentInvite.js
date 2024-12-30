const Sequelize = require("sequelize");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class SentInvite extends Model {
    static associate(models) {
      this.belongsTo(models.VoidanceInvite, { foreignKey: 'voidanceInviteID' });
      this.belongsTo(models.Company, { foreignKey: 'companyID' });
    }
  }

  SentInvite.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      validate: {
        isUUID: 4,
      },
      defaultValue: Sequelize.literal('uuid_generate_v4()'),
    },
    voidanceInviteID: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'voidance_invites',
        key: 'id',
      },
    },
    companyID: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'companies',
        key: 'id',
      },
    },
    createdAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'SentInvite',
    tableName: 'sent_invites',
    paranoid: true,
    timestamps: true,
  });

  return SentInvite;
};


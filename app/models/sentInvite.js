const Sequelize = require("sequelize");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class SentInvite extends Model {
    static associate(models) {
      this.belongsTo(models.VoidanceInvite, { foreignKey: 'voidanceInviteId' });
      this.belongsTo(models.Company, { foreignKey: 'companyId' });
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
    voidanceInviteId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'VoidanceInvite',
        key: 'id',
      },
    },
    companyId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Company',
        key: 'id',
      },
    },
    createdAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'SentInvite',
    paranoid: true,
    timestamps: true,
  });

  return SentInvite;
};


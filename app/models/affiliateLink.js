const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class AffiliateLink extends Model {
    static associate(models) {
      this.belongsTo(models.Voidance, { foreignKey: 'voidanceID' });
    }
  }

  AffiliateLink.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: sequelize.literal('uuid_generate_v4()'),
      },
      voidanceID: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'voidances',
          key: 'id',
        },
      },
      link: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      redirectTo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      clicks: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: 'AffiliateLink',
      tableName: 'affiliate_links',
      timestamps: true,
    }
  );

  return AffiliateLink;
};

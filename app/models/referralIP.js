const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ReferralIP extends Model {
    static associate(models) {
      this.belongsTo(models.AffiliateLink, { foreignKey: "affiliateLinkID" });
    }
  }

  ReferralIP.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: sequelize.literal("uuid_generate_v4()"),
      },
      affiliateLinkID: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "affiliate_links",
          key: "id",
        },
      },
      hashedIPAddress: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "ReferralIP",
      tableName: "referral_ips",
      timestamps: true,
    }
  );

  return ReferralIP;
};

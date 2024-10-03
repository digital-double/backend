const { Model } = require("sequelize");
const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Campaign extends Model {
    static associate(models) {
      this.belongsTo(models.Company, {
        foreignKey: {
          name: 'companyID',
          type: DataTypes.UUID,
        },
        allowNull: true,
      });
      this.hasMany(models.Advertisement, {
        foreignKey: {
          name: 'companyID',
          type: DataTypes.UUID,
        },
        allowNull: true,
      });
    }
  }

  Campaign.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      validate: {
        isUUID: 4,
      },
      defaultValue: Sequelize.literal('uuid_generate_v4()'),
    },
    companyID: {
      type:  DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Company',
        key: 'id',
      },
    },
    title: DataTypes.STRING,
    likes: DataTypes.INTEGER,
    description: DataTypes.STRING,
    totalBudget: DataTypes.FLOAT,
    campaignStatus: DataTypes.BOOLEAN,
    campaignStart: DataTypes.DATE,
    campaignEnd: DataTypes.DATE,
    avgCPC: DataTypes.FLOAT,
    numOfAds: DataTypes.INTEGER,
    numOfConversions: DataTypes.INTEGER,
    numOfModels: DataTypes.INTEGER,
    potentialReach: DataTypes.INTEGER,
    potentialEngagement: DataTypes.INTEGER,
    actualEngagement: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Campaign',
    paranoid: true,
    timestamps: true,
  });

  return Campaign;
};

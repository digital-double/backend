const { Model } = require("sequelize");
const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Advertisement extends Model {
    static associate(models) {
      this.belongsTo(models.Campaign, {
        foreignKey: {
          name: 'campaignID',
          type: DataTypes.UUID,
        },
        allowNull: true,
      });
    }
  }

  Advertisement.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      validate: {
        isUUID: 4,
      },
      defaultValue: Sequelize.literal('uuid_generate_v4()'),
    },
    campaignID: {
      type:  DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Campaign',
        key: 'id',
      },
    },
    title: DataTypes.STRING,
    Status: DataTypes.BOOLEAN,
    adStart: DataTypes.DATE,
    adEnd: DataTypes.DATE,
    alocatedBudget: DataTypes.FLOAT,
    spentBudget: DataTypes.FLOAT,
    conversions: DataTypes.INTEGER,
    leads: DataTypes.INTEGER,
    avgCPC: DataTypes.FLOAT,
    totalLikes: DataTypes.INTEGER,
    totalComments: DataTypes.INTEGER,
    description: DataTypes.STRING,
    numOfModels: DataTypes.INTEGER,
    potentialReach: DataTypes.INTEGER,
    fileName: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Advertisement',
    paranoid: true,
    timestamps: true,
  });

  return Advertisement;
};
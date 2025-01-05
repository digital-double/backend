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
        model: 'campaigns',
        key: 'id',
      },
    },
    title: DataTypes.STRING,
    Status: DataTypes.BOOLEAN,
    adStart: DataTypes.DATE,
    adEnd: DataTypes.DATE,
    minFollower: DataTypes.INTEGER,
    maxFollower: DataTypes.INTEGER,
    gender: DataTypes.STRING,
    minAge: DataTypes.INTEGER,
    maxAge: DataTypes.INTEGER,
    alocatedBudget: DataTypes.FLOAT,
    spentBudget: DataTypes.FLOAT,
    conversions: DataTypes.INTEGER,
    leads: DataTypes.INTEGER,
    avgCPC: DataTypes.FLOAT,
    totalLikes: DataTypes.INTEGER,
    totalComments: DataTypes.INTEGER,
    description: DataTypes.STRING,
    numOfModels: DataTypes.INTEGER,
    name: DataTypes.STRING,
    imagePath: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Advertisement',
    tableName: 'advertisements',
    paranoid: true,
    timestamps: true,
  });

  return Advertisement;
};

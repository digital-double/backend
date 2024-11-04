const { Model } = require('sequelize');
const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Voidances extends Model {
    static associate(models) {
      this.belongsTo(models.Users, { foreignKey: 'userId' });
      this.belongsTo(models.Advertisement, { foreignKey: 'advertisementId' });
      this.belongsTo(models.Company, { foreignKey: 'companyId' });
      this.hasOne(models.InstagramVoidance, { foreignKey: 'voidanceId' });
    }
  }

  Voidances.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        validate: {
          isUUID: 4,
        },
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      advertisementId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'Advertisements',
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
      affiliatedLink: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      numbOfClicks: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      fileType: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      fileLength: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      fileName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      qualityScore: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      uploadStatus: {
        type: DataTypes.ENUM('pending', 'processing', 'completed', 'failed'),
        defaultValue: 'pending',
        allowNull: false,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Voidances',
      paranoid: true,
      timestamps: true,
    }
  );

  return Voidances;
};

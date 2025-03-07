const { Model } = require('sequelize');
const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Voidance extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'userID' });
      this.belongsTo(models.Advertisement, { foreignKey: 'advertisementID' });
      this.belongsTo(models.Company, { foreignKey: 'companyID' });
    }
  }

  Voidance.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        validate: {
          isUUID: 4,
        },
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      userID: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      advertisementID: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'advertisements',
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
      imagePath: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      name: {
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
      modelName: 'Voidance',
      tableName: 'voidances',
      paranoid: true,
      timestamps: true,
    }
  );

  return Voidance;
};

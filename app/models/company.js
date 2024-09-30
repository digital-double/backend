const { Model } = require('sequelize');
const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    static associate(models) {
      // Define associations here
      // One-to-many relationship with CompanyAdmins
      Company.hasMany(models.CompanyAdmin, {
        foreignKey: 'companyID',
        as: 'admins',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }

  Company.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        validate: {
          isUUID: 4,
        },
        defaultValue: Sequelize.literal("uuid_generate_v4()"),
      },
      companyName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      logo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      banner: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      websiteUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      industry: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      verification: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      numOfRunningAds: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      bankName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      bankAccName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      bankAccNo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      bankRoutingNo: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      paypalAcc: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      bankIban: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      bankPaymentStatus: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Company',
      tableName: 'Companies',
      timestamps: true, // createdAt, updatedAt managed automatically
      paranoid: true,   // Enables soft deletion with deletedAt
    }
  );

  return Company;
};

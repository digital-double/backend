const Sequelize = require("sequelize");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class CompanyAdmin extends Model {
    static associate(model) {
      this.belongsTo(model.Company, {
        foreignKey: {
          name: "companyID",
          type: DataTypes.UUID,
        },
      });
    }
  }

  CompanyAdmin.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        validate: {
          isUUID: 4,
        },
        defaultValue: Sequelize.literal("uuid_generate_v4()"),
      },
      companyID: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Company",
          key: "id",
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      accessRights: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "CompanyAdmin",
      paranoid: true,
      timestamps: true,
    }
  );

  return CompanyAdmin;
};

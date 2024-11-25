const { Model } = require("sequelize");
const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class CompanyAdmin extends Model {
    static associate(models) {
      this.belongsTo(models.Company, { foreignKey: 'companyID' });
      this.hasOne(models.Users, { foreignKey: 'userID' });
    }
  }

  CompanyAdmin.init({
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
    userID: {
      type:  DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    email: DataTypes.STRING,
    accessRights: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'CompanyAdmin',
    paranoid: true,
    timestamps: true,
  });

  return CompanyAdmin;
};

const { Model } = require("sequelize");
const Sequelize = require("sequelize");
const bcrypt = require('bcrypt');
const { Op } = Sequelize;

module.exports = (sequelize, DataTypes) => {
  class CompanyAdmin extends Model {
    static associate(models) {
      this.belongsTo(models.Company, { foreignKey: 'companyID' });
    }
    
    static async createNewAdmin(companyID, userName, email, password, accessRights) {
      const passwordHash = await bcrypt.hash(password, 12);
      const [companyAdmin, created] = await CompanyAdmin.findOrCreate({
        where: {
          [Op.or]: [{ userName }, { email }],
        },
        defaults: {
          ...{ userName },
          ...{ email },
          ...{ passwordHash },
          ...{ accessRights },
          ...{ companyID },
        },
      });
      if (!created) {
        throw new StatusError('Admin already exists', 409);
      }
      return companyAdmin;

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
      allowNull: false,
      references: {
        model: 'companies',
        key: 'id',
      },
    },
    email: DataTypes.STRING,
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    passwordHash: DataTypes.STRING,
    accessRights: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'CompanyAdmin',
    tableName: 'company_admins',
    paranoid: true,
    timestamps: true,
  });

  return CompanyAdmin;
};

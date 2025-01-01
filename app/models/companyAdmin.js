const { Model } = require("sequelize");
const Sequelize = require("sequelize");
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class CompanyAdmin extends Model {
    static associate(models) {
      this.belongsTo(models.Company, { foreignKey: 'companyID' });
    }
    
    static createNewAdmin(userName, email, password, stripeID) {
      return bcrypt
        .hash(password, 12)
        .then((passwordHash) => {
          return CompanyAdmin.findOrCreate({
            where: {
              [Op.or]: [{ userName }, { email }],
            },
            defaults: {
              ...{ userName },
              ...{ email },
              ...{ passwordHash },
              ...{ stripeID },
            },
          });
        })
        .then(([companyAdmin, created]) => {
          if (!created) {
            throw new StatusError('Admin already exists', 409);
          }
          return companyAdmin;
        });
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
        model: 'companies',
        key: 'id',
      },
    },
    email: DataTypes.STRING,
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

const { Model } = require("sequelize");
const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    static associate(models) {
      this.hasMany(models.Campaign, {
        foreignKey: {
          name: 'companyID',
          type: DataTypes.UUID,
        },
        allowNull: true,
      });
      this.hasMany(models.Faq, {
        foreignKey: {
          name: 'companyID',
          type: DataTypes.UUID,
        },
        allowNull: true,
      });
    }
    
    static findCompanyByID = (id) => {
        return Company.findByPk(id, {
          attributes: {
            exclude: ['deletedAt','bankName','bankAccName',
                'bankAccNo','bankRoutingNo','paypalAcc','bankIban','bankPaymentStatus','createdAt','updatedAt'], 
          },
        }).then((company) => {
          if (!company) {
            throw new StatusError('Company not found', 404);
          }
          return company
        }).catch(() => {
          throw new StatusError('error retrieving company', 404);
        });
    }
  
  
  }

  Company.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      validate: {
        isUUID: 4,
      },
      defaultValue: Sequelize.literal('uuid_generate_v4()'),
    },
    companyName: DataTypes.STRING,
    userName: DataTypes.STRING,
    logo: DataTypes.STRING,
    description: DataTypes.STRING,
    banner: DataTypes.STRING,
    websiteUrl: DataTypes.STRING,
    industry: DataTypes.STRING,
    verification: DataTypes.STRING,
    numOfRunningAds: DataTypes.INTEGER,
    bankName: DataTypes.STRING,
    bankAccName: DataTypes.STRING,
    bankAccNo: DataTypes.STRING,
    bankRoutingNo: DataTypes.INTEGER,
    paypalAcc: DataTypes.STRING,
    bankIban: DataTypes.STRING,
    bankPaymentStatus: DataTypes.BOOLEAN,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Company',
    tableName: 'companies',
    paranoid: true,
    timestamps: true,
  });

  return Company;
};

const { Model } = require("sequelize");
const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  (async () => {
    try {
      await sequelize.query(`
        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
      `);
      console.log('Extension uuid-ossp created (if not already exists).');
    } catch (error) {
      console.error('Error creating uuid-ossp extension:', error);
    }
  })();
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
          throw new StatusError('error while retrieving company', 500);
        });
    }

    static createCompany = async (req) => {
      try {
        const {userName, companyName} = req.body
    
        if(!userName || !companyName){
          throw new StatusError("missing data", 409)
        }
    
        const newCompany = await Company.create(req.body);

        return newCompany
      } catch (err) {
        throw new StatusError('error while creating company', 500);
      }
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
    stripeId: DataTypes.STRING,
    accountId: DataTypes.STRING,
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

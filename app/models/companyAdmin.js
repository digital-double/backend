const { Model } = require("sequelize");
const Sequelize = require("sequelize");
const bcrypt = require('bcrypt');
const { Op } = Sequelize;
const { sessionObject } = require('../util/sessionObject');

module.exports = (sequelize, DataTypes) => {
  class CompanyAdmin extends Model {
    static associate(models) {
      this.belongsTo(models.Company, { foreignKey: 'companyID' });
    }
    
    static async createNewAdmin(companyID, userName, email, password, accessRights) {
      
      const passwordHash = await bcrypt.hash(password, 12);
      const [companyAdmin, created] = await CompanyAdmin.findOrCreate({
        where: {
          [Op.and]: [{ accessRights  }, { userName }],
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

  static findByLogin = (type, userCredential) => {
    if (!type || !userCredential) throw new StatusError('User', 404);
    return CompanyAdmin.findOne({
      where: { [type]: userCredential },
      rejectOnEmpty: true,
    }).catch(() => {
      throw new StatusError('User', 404);
    });
  };

  stripSensitive = () => sessionObject(this);

  login = (password, req) => {
    return this.comparePassword(password).then((doMatch) => {
      if (!doMatch) throw new StatusError('Wrong credentials', 403);
      const newSessionUser = this.stripSensitive();
      req.session.user = newSessionUser;
      return req.session.save();
    });
  };
  comparePassword = (password) => bcrypt.compare(password, this.passwordHash);

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
    name: DataTypes.STRING,
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

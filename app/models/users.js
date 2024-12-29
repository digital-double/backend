const { Model } = require('sequelize');
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const { sessionObject } = require('../util/sessionObject');
const { generateToken } = require('../util/tokenGenerator');

const { Op } = Sequelize;

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      this.hasOne(models.FacialData, { foreignKey: 'userID' });
      this.hasMany(models.InstagramVoidance, { foreignKey: 'userID' }); // add Many association to voidance later
      this.hasMany(models.ContactUs, { foreignKey: 'userID' });
      this.hasMany(models.VoidanceInvite, { foreignKey: 'userID' });
    }

    static createNewUser(userName, email, password, stripeID) {
      return bcrypt
        .hash(password, 12)
        .then((passwordHash) => {
          return Users.findOrCreate({
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
        .then(([user, created]) => {
          if (!created) {
            throw new StatusError('User already exists', 409);
          }
          return user;
        });
    }
  
    static findById = (id) => {
      if (!id) throw new StatusError('User', 404);
      return Users.findByPk(id, { rejectOnEmpty: true }).catch(() => {
        throw new StatusError('User', 404);
      });
    };
  
    static findByLogin = (type, userCredential) => {
      if (!type || !userCredential) throw new StatusError('User', 404);
      return Users.findOne({
        where: { [type]: userCredential },
        rejectOnEmpty: true,
      }).catch(() => {
        throw new StatusError('User', 404);
      });
    };
  
    static findByToken = (resetToken) => {
      if (!resetToken) throw new StatusError('User', 404);
      return Users.findOne({
        where: { resetToken },
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
  
    setPassword = (password) => {
      return bcrypt.hash(password, 12).then((passwordHash) => {
        this.passwordHash = passwordHash;
        this.resetToken = null;
        this.resetTokenExp = null;
        return this.save();
      });
    };
  
    replacePassword = (oldPassword, newPassword) => {
      return this.comparePassword(oldPassword).then((doMatch) => {
        if (!doMatch) throw new StatusError('Wrong credentials', 403);
        this.setPassword(newPassword);
      });
    };
  
    setResetToken = () => {
      return generateToken()
        .then((token) => {
          this.resetToken = token.toString('hex');
          this.resetTokenExp = Date.now() + 3600000;
          return this.save();
        })
        .then(() => this.resetToken);
    };

  }


  Users.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      validate: {
        isUUID: 4,
      },
      defaultValue: Sequelize.literal('uuid_generate_v4()'),
    },
    userName: DataTypes.STRING,
    email: DataTypes.STRING,
    passwordHash: DataTypes.STRING,
    resetToken: DataTypes.STRING,
    resetTokenExp: {
      type: DataTypes.DATE,
      allowNull: true,
      validate: {
        isDate: true,
      },
    },
    name: DataTypes.STRING,
    avatar: DataTypes.STRING,
    address: DataTypes.STRING,
    stripeID: DataTypes.STRING,
    country: DataTypes.STRING,
    city: DataTypes.STRING,
    banned: DataTypes.BOOLEAN,
    engagementScore: DataTypes.FLOAT,
    balance: DataTypes.FLOAT,
    companyEditor: DataTypes.BOOLEAN,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Users',
    paranoid: true,
    timestamps: true,
  });

  Users.beforeUpdate((user, options) => {
    if (user.changed('id') || user.changed('userName')) {
      throw new Error('The id and userName fields are immutable and cannot be changed.');
    }
  });

  return Users;
};

const { Model } = require("sequelize");
const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      this.hasOne(models.FacialData, { foreignKey: 'userID' });
      this.hasMany(models.InstagramVoidance, { foreignKey: 'userID' }); // add Many association to voidance later
      this.hasMany(models.ContactUs, { foreignKey: 'userID' });
      this.hasMany(models.VoidanceInvite, { foreignKey: 'userID' });
    }
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
    UserName: DataTypes.STRING,
    Email: DataTypes.STRING,
    Password: DataTypes.STRING,
    name: DataTypes.STRING,
    avatar: DataTypes.STRING,
    address: DataTypes.STRING,
    country: DataTypes.STRING,
    city: DataTypes.STRING,
    banned: DataTypes.BOOLEAN,
    engagementScore: DataTypes.FLOAT,
    balance: DataTypes.FLOAT,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Users',
    paranoid: true,
    timestamps: true,
  });

  return Users;
};

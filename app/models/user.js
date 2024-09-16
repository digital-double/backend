const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {}

  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      UserName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      Email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      Password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: DataTypes.STRING,
      avatar: DataTypes.STRING,
      address: DataTypes.STRING,
      country: DataTypes.STRING,
      city: DataTypes.STRING,
      banned: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      engagementScore: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      balance: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "User",
      paranoid: true,
      timestamps: true,
    }
  );

  return User;
};

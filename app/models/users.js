const { Model } = require("sequelize");
const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      this.hasOne(models.FacialData, {
        foreignKey: {
          name: "userID",
          type: DataTypes.UUID,
        },
      });
      this.hasOne(models.InstagramCredentials, {
        foreignKey: {
          name: "userID",
          type: DataTypes.UUID,
        },
      });
      this.hasMany(models.VoidanceInvite, {
        foreignKey: {
          name: "userID",
          type: DataTypes.UUID,
        },
      });
    }
  }

  Users.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        validate: {
          isUUID: 4,
        },
        defaultValue: Sequelize.literal("uuid_generate_v4()"),
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
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
      modelName: "Users",
      paranoid: true,
      timestamps: true,
    }
  );

  return Users;
};

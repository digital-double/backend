const { Model } = require("sequelize");
const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class InstagramCredentials extends Model {
    static associate(models) {
      this.belongsTo(models.Users, { foreignKey: 'userID' });
    }
  }

  InstagramCredentials.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      validate: {
        isUUID: 4,
      },
      defaultValue: Sequelize.literal('uuid_generate_v4()'),
    },
    userID: {
      type:  DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    Username: DataTypes.STRING,
    igEmail: DataTypes.STRING,
    accessToken: DataTypes.STRING,
    AccountLinked: DataTypes.BOOLEAN,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'InstagramCredential',
    paranoid: true,
    timestamps: true,
  });

  return InstagramCredentials;
};

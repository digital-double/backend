const { Model } = require("sequelize");
const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class InstagramVoidance extends Model {
    static associate(models) {
      this.hasOne(models.Users, { foreignKey: 'userID' });
    }
  }

  InstagramVoidance.init({
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
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    fileType: DataTypes.STRING,
    fileLength: DataTypes.STRING,
    fileName: DataTypes.STRING,
    description: DataTypes.STRING,
    uploadDate: DataTypes.DATE,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'InstagramVoidance',
    paranoid: true,
    timestamps: true,
  });

  return InstagramVoidance;
};

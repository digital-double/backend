const { Model } = require("sequelize");
const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ContactUs extends Model {
    static associate(models) {
      this.belongsTo(models.Users, { foreignKey: 'userID' });
      this.belongsTo(models.Advertisement, { foreignKey: 'advertisementID' });
    }
  }

  ContactUs.init({
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
        model: 'User',
        key: 'id',
      },
    },
    companyID: {
      type:  DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Company',
        key: 'id',
      },
    },
    advertisementID: {
      type:  DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Advertisement',
        key: 'id',
      },
    },
    subject: DataTypes.STRING,
    message: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'ContactUs',
    paranoid: true,
    timestamps: true,
  });

  return ContactUs;
};

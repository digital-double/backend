const { Model } = require('sequelize');
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Session extends Model {}
  Session.init(
    {
      sid: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      expires: Sequelize.DATE,
      data: Sequelize.TEXT,
    },
    {
      sequelize,
      timestamps: true,
      modelName: 'Session',
      tableName: 'sessions',
    }
  );
  return Session;
};
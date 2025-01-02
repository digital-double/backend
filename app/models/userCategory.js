const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserCategory extends Model {}

  UserCategory.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: sequelize.literal('uuid_generate_v4()'),
      },
      userID: {
        type: DataTypes.UUID,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      categoryID: {
        type: DataTypes.UUID,
        references: {
          model: 'categories',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    },
    {
      sequelize,
      modelName: 'UserCategory',
      tableName: 'user_categories',
      timestamps: true,
    }
  );

  return UserCategory;
};

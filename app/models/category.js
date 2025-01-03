const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      this.belongsToMany(models.User, {
        through: models.UserCategory,
        foreignKey: 'categoryID',
        otherKey: 'userID',
      });
    }
  }

  Category.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: sequelize.literal('uuid_generate_v4()'),
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, 
      },
      description: {
        type: DataTypes.TEXT, 
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Category',
      tableName: 'categories',
      timestamps: true,
      paranoid: true,
    }
  );

  return Category;
};


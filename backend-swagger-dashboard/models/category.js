const { Model } = require("sequelize");
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Category extends Model {
    static associate(models) {
      Category.hasMany(models.User, {
        foreignKey: "category_id",
        as: "users",
      });
    }
  }

  Category.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      nom: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "Category",
      tableName: "categories",
      timestamps: true,
      underscored: true,
    }
  );

  return Category;
};

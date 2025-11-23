'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Expense extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Expense.belongsTo(models.User, {
        foreignKey: "userId"
      });
      Expense.belongsTo(models.Category, {
        foreignKey: "categoryId"
      })
    }
  }
  Expense.init({
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },

    description: {
      type: DataTypes.STRING
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id"
      }
    },
    categoryId: {
      type:DataTypes.INTEGER,
      allowNull:false,
      references:{
        model: "Categories",
        key: "id"
      }
    }
  }, {
    sequelize,
    modelName: 'Expense',
  });
  return Expense;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class messages extends Model {
    static associate(models) {
    }
  }
  messages.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
    }
  }, {
    sequelize: sequelize,
    timestamps: true,
    modelName: 'messages',
    paranoid: true
  });
  return messages;
};
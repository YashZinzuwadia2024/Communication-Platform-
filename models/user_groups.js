'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_groups extends Model {
    static associate(models) {
      user_groups.belongsTo(models.users, {
        foreignKey: "user_id"
      }); 
      user_groups.belongsTo(models.groups, {
        foreignKey: "group_id"
      });
    }
  }
  user_groups.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    }
  }, {
    sequelize: sequelize,
    timestamps: true,
    modelName: 'user_groups',
    paranoid: true
  });
  return user_groups;
};
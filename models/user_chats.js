'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_chats extends Model {
    static associate(models) {
      user_chats.belongsTo(models.users, {
        foreignKey: "user_id"
      });
      user_chats.belongsTo(models.chats, {
        foreignKey: "chat_id"
      });
    }
  }
  user_chats.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    }
  }, {
    sequelize: sequelize,
    timestamps: true,
    modelName: 'user_chats',
    paranoid:true
  });
  return user_chats;
};
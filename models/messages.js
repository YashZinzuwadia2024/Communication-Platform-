'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class messages extends Model {
    static associate(models) {
      messages.belongsToMany(models.users, { 
        through: 'MessageReadBy', 
        as: 'readBy', 
        foreignKey: 'messageId' 
      });
      messages.belongsTo(models.users, { 
        as: 'sender', 
        foreignKey: 'senderId' 
      });
      messages.belongsTo(models.chats, { 
        as: 'chat', 
        foreignKey: 'chatId' 
      });
      messages.hasMany(models.chats, { 
        foreignKey: 'latestMessageId' 
      });
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
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class chats extends Model {
    static associate(models) {
      chats.belongsToMany(models.users, { 
          through: 'ChatUsers' 
        }
      );
      chats.hasMany(models.messages, { 
        foreignKey: 'chatId'
      });
      chats.belongsTo(models.users, { 
        as: 'groupAdmin', 
        foreignKey: 'groupAdminId' 
      });
      chats.belongsTo(models.messages, { 
        as: 'latestMessage', 
        foreignKey: 'latestMessageId' 
      });
    }
  }
  chats.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    chatName: {
      type: DataTypes.STRING
    },
    isGroupChat: {
      type: DataTypes.BOOLEAN
    }
  }, {
    sequelize: sequelize,
    timestamps: true,
    modelName: 'chats',
    paranoid: true
  });
  return chats;
};
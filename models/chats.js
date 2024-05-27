'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class chats extends Model {
    static associate(models) {
      chats.hasMany(models.messages, {
        foreignKey: 'message_id'
      });
      chats.hasMany(models.user_chats, {
        foreignKey: "chat_id"
      });
    }
  }
  chats.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    }
  }, {
    sequelize: sequelize,
    timestamps: true,
    modelName: 'chats',
    paranoid: true
  });
  return chats;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class messages extends Model {
    static associate(models) {
      messages.belongsTo(models.users, {
        foreignKey: 'user_id'
      });
      messages.belongsTo(models.chats, {
        foreignKey: 'message_id'
      });
      messages.belongsTo(models.groups, {
        foreignKey: "message_id"
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
    chat_id: {
      type: DataTypes.UUID,
    },
    group_id: {
      type: DataTypes.UUID
    },
    type: {
      type: DataTypes.ENUM('text','file'),
      allowNull: false
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize: sequelize,
    timestamps: true,
    modelName: 'messages',
    paranoid: true
  });
  return messages;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    static associate(models) {
      users.hasMany(models.messages, {
        foreignKey: 'user_id'
      });
      users.hasMany(models.user_groups, {
        foreignKey: 'user_id'
      });
      users.hasMany(models.user_chats, {
        foreignKey: "user_id"
      });
    }
  }
  users.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    contact_no: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: 10
      }
    },
    status: {
      type: DataTypes.TEXT
    },
    profile_path: {
      type: DataTypes.STRING
    }
  }, {
    sequelize: sequelize,
    timestamps: true,
    modelName: 'users',
    paranoid: true
  });
  return users;
};
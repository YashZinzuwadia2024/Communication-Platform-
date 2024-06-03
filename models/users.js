'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    async matchPassword(enteredPassword) {
      return await bcrypt.compare(enteredPassword, this.password);
    }
    static associate(models) {
      users.belongsToMany(models.chats, { 
        through: 'ChatUsers' 
      });
      users.belongsToMany(models.messages, { 
        through: 'MessageReadBy', 
        as: 'readMessages', 
        foreignKey: 'userId' 
      });
      users.hasMany(models.messages, { 
        foreignKey: 'senderId' 
      });
      users.hasMany(models.chats, { 
        foreignKey: 'groupAdminId' 
      });
    }
  }
  users.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pic: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "users",
    timestamps: true,
    hooks: {
      beforeSave: async (user) => {
        if (user.changed("password")) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
    },
    paranoid: true
  });
  return users;
};
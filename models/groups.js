'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class groups extends Model {
    static associate(models) {
      groups.hasMany(models.messages, {
        foreignKey: "message_id"
      });
      groups.hasMany(models.user_groups, {
        foreignKey: 'group_id'
      });
    }
  }
  groups.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    group_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    group_description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    profile_path: {
      type: DataTypes.STRING
    }
  }, {
    sequelize: sequelize,
    timestamps: true,
    modelName: 'groups',
    paranoid: true
  });
  return groups;
};
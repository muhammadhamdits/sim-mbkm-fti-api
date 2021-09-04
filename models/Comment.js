const { DataTypes, Model } = require('sequelize');
const db = require('../database/db');
const Logbook = require('./Logbook');

class Comment extends Model {

}

Comment.init(
  {
    logbook_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Logbook,
        key: 'id'
      },
      allowNull: false,
      validate: { 
        notEmpty: { msg: "Student cannot be empty, please input this field!" },
        notNull: { msg: "Student cannot be empty, please input this field!" },
        isInt: { msg: "Student invalid! Please input valid data!" }
      }
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { 
        notEmpty: { msg: "Program cannot be empty, please input this field!" },
        notNull: { msg: "Program cannot be empty, please input this field!" }
      }
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      validate: { 
        notEmpty: { msg: "Program cannot be empty, please input this field!" },
        notNull: { msg: "Program cannot be empty, please input this field!" }
      }
    },
    is_lecturer: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      validate: { 
        notEmpty: { msg: "Program cannot be empty, please input this field!" },
        notNull: { msg: "Program cannot be empty, please input this field!" },
        isBoolean: { msg: "Data Type not match!" }
      }
    }
  },
  {
    sequelize: db,
    modelName: 'Comment',
    timestamps: false
  }
)

module.exports = Comment
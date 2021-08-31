const { DataTypes, Model } = require('sequelize');
const db = require('../database/db');
const Logbook = require('./Logbook');

class Comment extends Model {

}

Comment.init(
  {
    student_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Logbook,
        key: 'student_id'
      },
      allowNull: false,
      validate: { 
        notEmpty: { msg: "Student cannot be empty, please input this field!" },
        notNull: { msg: "Student cannot be empty, please input this field!" },
        isInt: { msg: "Student invalid! Please input valid data!" }
      }
    },
    program_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Logbook,
        key: 'program_id'
      },
      allowNull: false,
      validate: { 
        notEmpty: { msg: "Program cannot be empty, please input this field!" },
        notNull: { msg: "Program cannot be empty, please input this field!" },
        isInt: { msg: "Program invalid! Please input valid data!" }
      }
    },
    date: {
      type: DataTypes.DATEONLY,
      references: {
        model: Logbook,
        key: 'date'
      },
      allowNull: false,
      validate: { 
        notEmpty: { msg: "Start date cannot be empty, please input this field!" },
        isDate: { msg: "Invalid data type provided! Start date must be date!" }
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
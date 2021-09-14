const { DataTypes, Model } = require('sequelize');
const db = require('../database/db')

class Course extends Model {

}

Course.init(
  {
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { msg: "This code already registered, please input another!" },
      validate: { 
        notEmpty: { msg: "Code cannot be empty, please input this field!" },
        notNull: { msg: "Code cannot be empty, please input this field!" }
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { 
        notEmpty: { msg: "Name cannot be empty, please input this field!" },
        notNull: { msg: "Name cannot be empty, please input this field!" }
      }
    },
    sks: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { 
        notEmpty: { msg: "SKS cannot be empty, please input this field!" },
        notNull: { msg: "SKS cannot be empty, please input this field!" },
        isInt: { msg: "SKS must be integer value!" },
        min: { args: 1, msg: "SKS invalid, sks mininum value is 1!" }
      }
    },
    type: {
      type: DataTypes.INTEGER, // 0: Wajib, 1: Pilihan
      allowNull: false,
      validate: {
        notEmpty: { msg: "Type cannot be empty, please input this field!" },
        notNull: { msg: "Type cannot be empty, please input this field!" },
        isInt: { msg: "Type must be valid value!" }
      }
    },
    semester: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Type cannot be empty, please input this field!" },
        notNull: { msg: "Type cannot be empty, please input this field!" },
        isInt: { msg: "Type must be valid value!" },
        min: { args: 1, msg: "SKS invalid, sks mininum value is 1!" },
        max: { args: 8, msg: "SKS invalid, sks maximum value is 8!" }
      }
    }
  },
  {
    sequelize: db,
    modelName: 'Course',
    timestamps: false
  }
)

module.exports = Course
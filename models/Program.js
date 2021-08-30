const { DataTypes, Model } = require('sequelize')
const db = require('../database/db')
const Agency = require('./Agency')
const ProgramType = require('./ProgramType')

class Program extends Model {

}

Program.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { msg: "This name already registered, please input another!" },
      validate: { 
        notEmpty: { msg: "Name cannot be empty, please input this field!" },
        notNull: { msg: "Name cannot be empty, please input this field!" }
      }
    },
    is_certified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      validate: {
        isBoolean: { msg: "Invalid data type provided! Value must be true or false" }
      }
    },
    is_remote: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      validate: {
        isBoolean: { msg: "Invalid data type provided! Value must be true or false" }
      }
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: { 
        notEmpty: { msg: "Start date cannot be empty, please input this field!" },
        notNull: { msg: "Start date cannot be empty, please input this field!" },
        isDate: { msg: "Invalid data type provided! Start date must be date!" },
        // isAfter: { args: DataTypes.NOW, msg: "Start date invalid! Cannot before today date." }
      }
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: { 
        notEmpty: { msg: "End date cannot be empty, please input this field!" },
        notNull: { msg: "End date cannot be empty, please input this field!" },
        isDate: { msg: "Invalid data type provided! Start date must be date!" },
        // isAfter: { args: DataTypes.NOW, msg: "End date invalid! Cannot before today date." }
      }
    },
    description: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    min_semester: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: { 
        isInt: { msg: "Min semester must be integer value!" },
        min: { args: 1, msg: "Min semester invalid, minimum value is 1!" }
      }
    },
    sks: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 20,
      validate: { 
        isInt: { msg: "SKS must be integer value!" },
        min: { args: 20, msg: "SKS invalid, minimum value is 20!" }
      }
    },
    program_type_id: {
      type: DataTypes.INTEGER,
      references: {
        model: ProgramType,
        key: 'id'
      },
      allowNull: false,
      validate: { 
        notEmpty: { msg: "Program type cannot be empty, please input this field!" },
        notNull: { msg: "Program type cannot be empty, please input this field!" },
        isInt: { msg: "Program type invalid! Please input valid data!" }
      }
    },
    agency_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Agency,
        key: 'id'
      },
      allowNull: false,
      validate: { 
        notEmpty: { msg: "Agency cannot be empty, please input this field!" },
        notNull: { msg: "Agency cannot be empty, please input this field!" },
        isInt: { msg: "Agency invalid! Please input valid data!" }
      }
    }
  },
  {
    sequelize: db,
    modelName: 'Program',
    timestamps: false
  }
)

module.exports = Program
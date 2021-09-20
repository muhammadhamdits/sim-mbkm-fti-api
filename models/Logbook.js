const { DataTypes, Model } = require('sequelize');
const db = require('../database/db');
const StudentProgram = require('./StudentProgram');

class Logbook extends Model {

}

Logbook.init(
  {
    student_id: {
      type: DataTypes.INTEGER,
      references: {
        model: StudentProgram,
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
        model: StudentProgram,
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
      allowNull: false,
      defaultValue: DataTypes.NOW,
      validate: { 
        notEmpty: { msg: "Start date cannot be empty, please input this field!" },
        isDate: { msg: "Invalid data type provided! Start date must be date!" }
      }
    },
    log: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { 
        notEmpty: { msg: "Program cannot be empty, please input this field!" },
        notNull: { msg: "Program cannot be empty, please input this field!" }
      }
    },
    file: DataTypes.STRING
  },
  {
    sequelize: db,
    modelName: 'Logbook',
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['student_id', 'program_id', 'date']
      }
    ]
  }
)

module.exports = Logbook
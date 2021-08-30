const { DataTypes, Model } = require('sequelize');
const db = require('../database/db');
const Lecturer = require('./Lecturer');
const Program = require('./Program');
const Student = require('./Student');

class StudentProgram extends Model {

}

StudentProgram.init(
  {
    student_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Student,
        key: 'id'
      },
      allowNull: false,
      primaryKey: 'compositeIndex',
      validate: { 
        notEmpty: { msg: "Student cannot be empty, please input this field!" },
        notNull: { msg: "Student cannot be empty, please input this field!" },
        isInt: { msg: "Student invalid! Please input valid data!" }
      }
    },
    program_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Program,
        key: 'id'
      },
      allowNull: false,
      primaryKey: 'compositeIndex',
      validate: { 
        notEmpty: { msg: "Program cannot be empty, please input this field!" },
        notNull: { msg: "Program cannot be empty, please input this field!" },
        isInt: { msg: "Program invalid! Please input valid data!" }
      }
    },
    lecturer_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Lecturer,
        key: 'id'
      },
      defaultValue: null,
      validate: {
        isInt: { msg: "Lecturer invalid! Please input valid data!" }
      }
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0, //0: Proposed, 1: Accepted, 2: Rejected, 3: Active, 4: Ended
      validate: { 
        isInt: { msg: "Status invalid! Please input valid data!" },
        minVal(value){ if(value < 0) throw new Error("Status value min 0. Please input valid value!") },
        max: { args: 4, msg: "Status value max 4. Please input valid value!" }
      }
    },
    accepted_file: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    completed_file: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    transcript_file: {
      type: DataTypes.STRING,
      defaultValue: null
    }
  },
  {
    sequelize: db,
    modelName: 'StudentProgram',
    timestamps: false
  }
)

module.exports = StudentProgram
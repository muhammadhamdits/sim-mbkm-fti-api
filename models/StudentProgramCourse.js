const { DataTypes, Model } = require('sequelize');
const db = require('../database/db');
const ProgramCourse = require('./ProgramCourse');
const StudentProgram = require('./StudentProgram');

class StudentProgramCourse extends Model {

}

StudentProgramCourse.init(
  {
    student_id: {
      type: DataTypes.INTEGER,
      references: {
        model: StudentProgram,
        key: 'student_id'
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
        model: StudentProgram,
        key: 'program_id'
      },
      allowNull: false,
      primaryKey: 'compositeIndex',
      validate: { 
        notEmpty: { msg: "Program cannot be empty, please input this field!" },
        notNull: { msg: "Program cannot be empty, please input this field!" },
        isInt: { msg: "Program invalid! Please input valid data!" }
      }
    },
    // program_id: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: ProgramCourse,
    //     key: 'program_id'
    //   },
    //   allowNull: false,
    //   primaryKey: 'compositeIndex'
    // },
    course_id: {
      type: DataTypes.INTEGER,
      references: {
        model: ProgramCourse,
        key: 'course_id'
      },
      allowNull: false,
      primaryKey: 'compositeIndex',
      validate: { 
        notEmpty: { msg: "Course cannot be empty, please input this field!" },
        notNull: { msg: "Course cannot be empty, please input this field!" },
        isInt: { msg: "Course invalid! Please input valid data!" }
      }
    },
    score: {
      type: DataTypes.INTEGER,
      defaultValue: null,
      validate: { 
        isInt: { msg: "Score invalid! Please input valid data!" },
        minVal(value){ if(value < 0) throw new Error("Score value min 0. Please input valid value!") },
        max: { args: 100, msg: "Score value max 100. Please input valid value!" }
      }
    },
    is_accepted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      validate: {
        isBoolean: { msg: "Invalid data type provided! Value must be true or false" }
      }
    }
  },
  {
    sequelize: db,
    modelName: 'StudentProgramCourse',
    timestamps: false,
  }
)

module.exports = StudentProgramCourse
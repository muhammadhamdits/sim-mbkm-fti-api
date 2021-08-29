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
      primaryKey: 'compositeIndex'
    },
    program_id: {
      type: DataTypes.INTEGER,
      references: {
        model: StudentProgram,
        key: 'program_id'
      },
      allowNull: false,
      primaryKey: 'compositeIndex'
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
      primaryKey: 'compositeIndex'
    },
    score: {
      type: DataTypes.INTEGER,
      defaultValue: null
    },
    is_accepted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  {
    sequelize: db,
    modelName: 'StudentProgramCourse',
    timestamps: false,
  }
)

module.exports = StudentProgramCourse
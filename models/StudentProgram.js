const { DataTypes, Model } = require('sequelize')
const db = require('../database/db')
const Comment = require('./Comment')
const Course = require('./Course')
const Lecturer = require('./Lecturer')
const Logbook = require('./Logbook')
const Program = require('./Program')
const Student = require('./Student')
const StudentProgramCourse = require('./StudentProgramCourse')

class StudentProgram extends Model {
  program
  supervisor
  student
  courses
  logbooks

  async init(){
    this.program = await Program.findOne({ where: { id: this.program_id } })
    this.supervisor = await Lecturer.findOne({ where: { id: this.lecturer_id } })
    this.student = await Student.findOne({ where: { id: this.student_id } })

    let tempCourses = await StudentProgramCourse.findAll({ where: { student_id: this.student_id, program_id: this.program_id } })
    let tempCoursesData = []
    await Promise.all(tempCourses.map(async tempCourse => {
      let course = await Course.findOne({ where: { id: tempCourse.course_id } })
      tempCourse.course = course
      tempCoursesData.push(tempCourse)
    }))
    this.courses = tempCoursesData

    let tempLogbooks = await Logbook.findAll({ where: { student_id: this.student_id, program_id: this.program_id } })
    let tempLogbooksData = []
    await Promise.all(tempLogbooks.map(async tempLogbook => {
      let comments = await Comment.findAll({ where: { logbook_id: tempLogbook.id } })
      tempLogbook.comments = comments
      tempLogbooksData.push(tempLogbook)
    }))
    this.logbooks = tempLogbooksData
  }
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
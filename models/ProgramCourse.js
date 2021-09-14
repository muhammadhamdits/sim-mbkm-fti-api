const { DataTypes, Model } = require('sequelize');
const db = require('../database/db');
const Course = require('./Course');
const Program = require('./Program');

class ProgramCourse extends Model {

}

ProgramCourse.init(
  {
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
    course_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Course,
        key: 'id'
      },
      allowNull: false,
      primaryKey: 'compositeIndex',
      validate: { 
        notEmpty: { msg: "Course cannot be empty, please input this field!" },
        notNull: { msg: "Course cannot be empty, please input this field!" },
        isInt: { msg: "Course invalid! Please input valid data!" }
      }
    },
    is_deleted: {
      type : DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  },
  {
    sequelize: db,
    modelName: 'ProgramCourse',
    timestamps: false
  }
)

module.exports = ProgramCourse
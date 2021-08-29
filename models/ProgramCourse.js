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
      primaryKey: 'compositeIndex'
    },
    course_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Course,
        key: 'id'
      },
      allowNull: false,
      primaryKey: 'compositeIndex'
    }
  },
  {
    sequelize: db,
    modelName: 'ProgramCourse',
    timestamps: false
  }
)

module.exports = ProgramCourse
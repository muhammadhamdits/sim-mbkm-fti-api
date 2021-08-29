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
      primaryKey: 'compositeIndex'
    },
    program_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Program,
        key: 'id'
      },
      allowNull: false,
      primaryKey: 'compositeIndex'
    },
    lecturer_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Lecturer,
        key: 'id'
      },
      defaultValue: null
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0 //0: Proposed, 1: Accepted, 2: Rejected, 3: Active, 4: Ended
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
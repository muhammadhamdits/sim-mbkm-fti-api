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
    log: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      unique: true
    }
  },
  {
    sequelize: db,
    modelName: 'Logbook',
    timestamps: false
  }
)

module.exports = Logbook
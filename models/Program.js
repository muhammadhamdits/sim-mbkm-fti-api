const { DataTypes, Model } = require('sequelize');
const db = require('../database/db');
const Agency = require('./Agency');
const ProgramType = require('./ProgramType');

class Program extends Model {

}

Program.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    is_certified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    is_remote: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    min_semester: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    sks: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 20
    },
    program_type_id: {
      type: DataTypes.INTEGER,
      references: {
        model: ProgramType,
        key: 'id'
      },
      allowNull: false
    },
    agency_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Agency,
        key: 'id'
      },
      allowNull: false
    }
  },
  {
    sequelize: db,
    modelName: 'Program',
    timestamps: false
  }
)

module.exports = Program
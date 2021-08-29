const { DataTypes, Model } = require('sequelize');
const db = require('../database/db')

class ProgramType extends Model {

}

ProgramType.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { notEmpty: true }
    }
  },
  {
    sequelize: db,
    modelName: 'ProgramType',
    timestamps: false
  }
)

module.exports = ProgramType
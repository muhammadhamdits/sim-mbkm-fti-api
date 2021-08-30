const { DataTypes, Model } = require('sequelize')
const db = require('../database/db')

class ProgramType extends Model {

}

ProgramType.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { msg: "This name already registered, please input another!" },
      validate: { 
        notEmpty: { msg: "Name cannot be empty, please input this field!" },
        notNull: { msg: "Name cannot be empty, please input this field!" }
      }
    }
  },
  {
    sequelize: db,
    modelName: 'ProgramType',
    timestamps: false
  }
)

module.exports = ProgramType
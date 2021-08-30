const { DataTypes, Model } = require('sequelize');
const db = require('../database/db')

class Course extends Model {

}

Course.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { msg: "This name already registered, please input another!" },
      validate: { 
        notEmpty: { msg: "Name cannot be empty, please input this field!" },
        notNull: { msg: "Name cannot be empty, please input this field!" }
      }
    },
    sks: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { 
        notEmpty: { msg: "SKS cannot be empty, please input this field!" },
        notNull: { msg: "SKS cannot be empty, please input this field!" },
        isInt: { msg: "SKS must be integer value!" },
        min: { args: 1, msg: "SKS invalid, sks mininum value is 1!" }
      }
    }
  },
  {
    sequelize: db,
    modelName: 'Course',
    timestamps: false
  }
)

module.exports = Course
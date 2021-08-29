const { DataTypes, Model } = require('sequelize');
const db = require('../database/db')

class Student extends Model {

}

Student.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nim: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize: db,
    modelName: 'Student',
    timestamps: false
  }
)

module.exports = Student
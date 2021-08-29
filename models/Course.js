const { DataTypes, Model } = require('sequelize');
const db = require('../database/db')

class Course extends Model {

}

Course.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sks: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize: db,
    modelName: 'Course',
    timestamps: false
  }
)

module.exports = Course
const { DataTypes, Model } = require('sequelize');
const db = require('../database/db')

class Lecturer extends Model {

}

Lecturer.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nip: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    is_head: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  },
  {
    sequelize: db,
    modelName: 'Lecturer',
    timestamps: false
  }
)

module.exports = Lecturer
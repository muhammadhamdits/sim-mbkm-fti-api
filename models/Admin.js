const { DataTypes, Model } = require('sequelize');
const db = require('../database/db')

class Admin extends Model {

}

Admin.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
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
    modelName: 'Admin',
    timestamps: false
  }
)

module.exports = Admin
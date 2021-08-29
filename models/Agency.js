const { DataTypes, Model } = require('sequelize');
const db = require('../database/db')

class Agency extends Model {

}

Agency.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: DataTypes.STRING
  },
  {
    sequelize: db,
    modelName: 'Agency',
    timestamps: false
  }
)

module.exports = Agency
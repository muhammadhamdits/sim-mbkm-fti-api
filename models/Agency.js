const { DataTypes, Model } = require('sequelize');
const db = require('../database/db')

class Agency extends Model {

}

Agency.init(
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
    address: DataTypes.STRING,
    sector: DataTypes.STRING,
    description: DataTypes.STRING,
    website: DataTypes.STRING
  },
  {
    sequelize: db,
    modelName: 'Agency',
    timestamps: false
  }
)

module.exports = Agency
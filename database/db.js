const dotenv = require('dotenv')
const { Sequelize } = require('sequelize')

dotenv.config()

const db = new Sequelize(
  `${process.env.DB_NAME}`,
  `${process.env.DB_USER}`,
  `${process.env.DB_PASS}`,
  {
    host: `${process.env.DB_HOST}`,
    dialect: 'mysql',
    dialectOptions: { 
      port: process.env.DB_PORT
    }
  }
)

module.exports = db
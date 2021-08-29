const Admin = require('../models/Admin')
const jwt = require('jsonwebtoken')
const dontenv = require('dotenv')

dontenv.config()

const createToken = (id, role) => { 
  return jwt.sign(
    { id, role }, 
    process.env.SECRET_STRING, 
    { expiresIn: process.env.MAX_AGE }
  ) 
}

const index = async (req, res) => {
  const admin = await Admin.create({
    name: "tes",
    username: "tes",
    password: "tes"
  })

  res.send('done')
}

module.exports = { index }
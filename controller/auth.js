const { Admin } = require('../model/admin')
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


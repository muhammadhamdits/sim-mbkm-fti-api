const jwt = require('jsonwebtoken')
const dontenv = require('dotenv')
const Admin = require('../models/Admin')
const Student = require('../models/Student')
const Lecturer = require('../models/Lecturer')

dontenv.config()

const createToken = (id, role) => { 
  return jwt.sign(
    { id, role }, 
    process.env.SECRET_STRING, 
    { expiresIn: process.env.MAX_AGE }
  ) 
}

const login = async (req, res, next) => {
  const username = req.body.username
  const password = req.body.password
  
  if(user = await Admin.login(username, password)) role = "Admin"
  else if(user = await Student.login(username, password)) role = "Student"
  else if(user = await Lecturer.login(username, password)) role = user.is_head

  if(user){
    maxAge = process.env.MAX_AGE * 1000
    res.cookie('jwt', createToken(user.id, role), { httpOnly: true, maxAge }).send("Login")
  }else res.send("Gagal")

}

const logout = (req, res, next) => {
  res.cookie('jwt', '', { maxAge: 1 })
  res.send('logout')
}

module.exports = { login, logout }
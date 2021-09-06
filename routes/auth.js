const { Router } = require('express')
const { login, logout } = require('../controllers/auth')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const Admin = require('../models/Admin')
const Student = require('../models/Student')
const Lecturer = require('../models/Lecturer')

dotenv.config()

const router = new Router()

router.post('/', (req, res, next) => {
  jwt.verify(req.body.jwt, process.env.SECRET_STRING, async (err, decodedToken) => {
    if(err) res.json(err)
    else{
      if(decodedToken.role === 'Admin'){
        decodedToken.user = await Admin.findOne({ where: { id: decodedToken.id } })
      }else if(decodedToken.role === 'Student'){
        decodedToken.user = await Student.findOne({ where: { id: decodedToken.id } })
      }else{
        decodedToken.user = await Lecturer.findOne({ where: { id: decodedToken.id } })
      }
      res.json(decodedToken)
    }
  })
})
router.post('/login', login)
router.post('/logout', logout)

module.exports = router
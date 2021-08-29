const { Router } = require('express')
const { login, logout } = require('../controllers/auth')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

const router = new Router()

router.get('/', (req, res, next) => {
  jwt.verify(req.cookies.jwt, process.env.SECRET_STRING, (err, decodedToken) => {
    if(err) res.send('token fake')
    else res.send(decodedToken)
  })
})
router.post('/login', login)
router.post('/logout', logout)

module.exports = router
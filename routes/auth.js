const { Router } = require('express')
const { login, logout, index } = require('../controllers/auth')

const router = new Router()

router.get('/', index)
// router.post('/login', login)
// router.post('/logout', logout)

module.exports = router
const { Router } = require('express')
const { login, logout } = require('../controller/auth')

const router = new Router()

router.post('/login', login)
router.post('/logout', logout)

module.exports = router
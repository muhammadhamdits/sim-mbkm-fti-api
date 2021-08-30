const { Router } = require('express')
const studentprogram = require('../controllers/studentprogram')

const router = new Router()

router.get('/student/:studentId/program', studentprogram.index)
router.post('/student/:studentId/program', studentprogram.create)
router.get('/student/:studentId/program/:programId', studentprogram.show)
router.put('/student/:studentId/program/:programId', studentprogram.update)

module.exports = router
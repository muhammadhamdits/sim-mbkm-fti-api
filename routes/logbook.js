const { Router } = require('express')
const logbook = require('../controllers/logbook')

const router = new Router()

router.get('/student/:studentId/program/:programId/logbook', logbook.index)
router.post('/student/:studentId/program/:programId/logbook', logbook.create)

module.exports = router
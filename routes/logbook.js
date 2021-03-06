const { Router } = require('express')
const logbook = require('../controllers/logbook')
const auth = require('../middlewares/auth')

const router = new Router()

router.get('/student/:studentId/program/:programId/logbook', logbook.index)
router.post('/student/:studentId/program/:programId/logbook', logbook.create)
router.get('/logbook/:logId/download', logbook.download)

module.exports = router
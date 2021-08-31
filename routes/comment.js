const { Router } = require('express')
const comment = require('../controllers/comment')

const router = new Router()

router.get('/student/:studentId/program/:programId/logbook/:date/comment', comment.index)
router.post('/student/:studentId/program/:programId/logbook/:date/comment', comment.create)

module.exports = router
const { Router } = require('express')
const comment = require('../controllers/comment')
const auth = require('../middlewares/auth')

const router = new Router()

router.get('/student/:studentId/program/:programId/logbook/:date/comment', comment.index)
router.post('/comment/:logbookId', comment.create)

module.exports = router
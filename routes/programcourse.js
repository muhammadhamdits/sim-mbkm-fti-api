const { Router } = require('express')
const programcourse = require('../controllers/programcourse')

const router = new Router()

router.get('/program/:programId/course', programcourse.index)
router.post('/program/:programId/course', programcourse.create)
router.delete('/program/:programId/course/:courseId', programcourse.destroy)

module.exports = router
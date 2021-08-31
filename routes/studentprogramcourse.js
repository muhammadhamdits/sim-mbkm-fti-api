const { Router } = require('express')
const studentprogramcourse = require('../controllers/studentprogramcourse')

const router = new Router()

router.get('/student/:studentId/program/:programId/course', studentprogramcourse.index)
router.post('/student/:studentId/program/:programId/course', studentprogramcourse.create)
router.put('/student/:studentId/program/:programId/course/:courseId', studentprogramcourse.update)
router.delete('/student/:studentId/program/:programId/course/:courseId', studentprogramcourse.destroy)

module.exports = router
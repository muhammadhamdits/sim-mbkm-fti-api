const { Router } = require('express')
const studentprogramcourse = require('../controllers/studentprogramcourse')
const auth = require('../middlewares/auth')

const router = new Router()

router.get('/student/:studentId/program/:programId/course', auth.checkRole(["Student"]), studentprogramcourse.index)
router.post('/student/:studentId/program/:programId/course', auth.checkRole(["Student"]), studentprogramcourse.create)
router.put('/student/:studentId/program/:programId/course/:courseId', studentprogramcourse.update)
router.delete('/student/:studentId/program/:programId/course/:courseId', auth.checkRole(["Student"]), studentprogramcourse.destroy)
router.put('/student/:studentId/program/:programId/course', studentprogramcourse.bulkUpdate)

module.exports = router
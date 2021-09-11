const { Router } = require('express')
const studentprogramcourse = require('../controllers/studentprogramcourse')
const auth = require('../middlewares/auth')

const router = new Router()

router.get('/student/:studentId/program/:programId/course', auth.checkRole(["Student"]), studentprogramcourse.index)
router.post('/student/:studentId/program/:programId/course', auth.checkRole(["Student"]), studentprogramcourse.create)
router.put('/student/:studentId/program/:programId/course/:courseId', auth.checkRole([false]), studentprogramcourse.update)
router.delete('/student/:studentId/program/:programId/course/:courseId', auth.checkRole(["Student"]), studentprogramcourse.destroy)

module.exports = router
const { Router } = require('express')
const course = require('../controllers/course')
const auth = require('../middlewares/auth')

const router = new Router()

router.get('/course', auth.checkRole(["Admin"]), course.index)
router.post('/course', auth.checkRole(["Admin"]), course.create)
router.put('/course/:courseId', auth.checkRole(["Admin"]), course.update)
router.delete('/course/:courseId', auth.checkRole(["Admin"]), course.destroy)

module.exports = router
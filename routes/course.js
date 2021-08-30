const { Router } = require('express')
const course = require('../controllers/course')

const router = new Router()

router.get('/course', course.index)
router.post('/course', course.create)
router.put('/course/:courseId', course.update)
router.delete('/course/:courseId', course.destroy)

module.exports = router
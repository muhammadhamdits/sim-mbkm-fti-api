const { Router } = require('express')
const studentprogram = require('../controllers/studentprogram')
const auth = require('../middlewares/auth')

const router = new Router()

router.get('/student/:studentId/program', auth.checkRole(["Student"]), studentprogram.index)
router.post('/student/:studentId/program', auth.checkRole(["Student"]), studentprogram.create)
router.get('/student/:studentId/program/:programId', auth.checkRole(["Student"]), studentprogram.show)
router.put('/student/:studentId/program/:programId', auth.checkRole(["Student"]), studentprogram.update)

module.exports = router
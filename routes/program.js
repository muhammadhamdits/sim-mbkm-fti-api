const { Router } = require('express')
const program = require('../controllers/program')
const auth = require('../middlewares/auth')

const router = new Router()

router.get('/program', auth.checkRole(["Admin"]), program.index)
router.post('/program', auth.checkRole(["Admin"]), program.create)
router.get('/program/:programId', auth.checkRole(["Admin"]), program.show)
router.put('/program/:programId', auth.checkRole(["Admin"]), program.update)
router.delete('/program/:programId', auth.checkRole(["Admin"]), program.destroy)

module.exports = router
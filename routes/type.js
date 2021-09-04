const { Router } = require('express')
const type = require('../controllers/type')
const auth = require('../middlewares/auth')

const router = new Router()

router.get('/type', auth.checkRole(["Admin"]), type.index)
router.post('/type', auth.checkRole(["Admin"]), type.create)
router.put('/type/:typeId', auth.checkRole(["Admin"]), type.update)
router.delete('/type/:typeId', auth.checkRole(["Admin"]), type.destroy)

module.exports = router
const { Router } = require('express')
const type = require('../controllers/type')

const router = new Router()

router.get('/type', type.index)
router.post('/type', type.create)
router.put('/type/:typeId', type.update)
router.delete('/type/:typeId', type.destroy)

module.exports = router
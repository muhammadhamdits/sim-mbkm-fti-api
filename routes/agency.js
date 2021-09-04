const { Router } = require('express')
const agency = require('../controllers/agency')
const auth = require('../middlewares/auth')

const router = new Router()

router.get('/agency', auth.checkRole(["Admin"]), agency.index)
router.post('/agency', auth.checkRole(["Admin"]), agency.create)
router.put('/agency/:agencyId', auth.checkRole(["Admin"]), agency.update)
router.delete('/agency/:agencyId', auth.checkRole(["Admin"]), agency.destroy)

module.exports = router
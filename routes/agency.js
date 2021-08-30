const { Router } = require('express')
const agency = require('../controllers/agency')

const router = new Router()

router.get('/agency', agency.index)
router.post('/agency', agency.create)
router.put('/agency/:agencyId', agency.update)
router.delete('/agency/:agencyId', agency.destroy)

module.exports = router
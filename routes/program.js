const { Router } = require('express')
const program = require('../controllers/program')

const router = new Router()

router.get('/program', program.index)
router.post('/program', program.create)
router.get('/program/:programId', program.show)
router.put('/program/:programId', program.update)
router.delete('/program/:programId', program.destroy)

module.exports = router
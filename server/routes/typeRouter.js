const Router = require('express')
const router = new Router()
const typecController = require('../controllers/typeController')

router.post('/', typecController.create)
router.get('/', typecController.getAll)

module.exports = router
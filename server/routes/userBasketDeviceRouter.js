const Router = require('express')
const router = new Router()
const userBasketDeviceController = require('../controllers/userBasketDeviceController')
const authMiddleware = require("../middleware/authMiddleware");

router.post('/add',authMiddleware, userBasketDeviceController.addDeviceToBasket)
router.get('/', authMiddleware, userBasketDeviceController.getAll)

module.exports = router
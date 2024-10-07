const Router = require('express')
const router = new Router()
const ratingController = require('../controllers/ratingController')
const authMiddleware = require("../middleware/authMiddleware");

router.post('/add',authMiddleware, ratingController.addRating)
router.delete('/',authMiddleware, ratingController.deleteRating)

module.exports = router
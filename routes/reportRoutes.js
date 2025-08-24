const router = require('express').Router()
const {generateReport, getOrderReport} = require('../controllers/reportController')
const {isAdmin} =require("../controllers/userController")

router.route('/excel').get(generateReport)
// router.route('/excel/admin/:email').get(isAdmin,generateReport)
router.route('/order').get(getOrderReport)

module.exports = router
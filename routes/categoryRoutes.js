const router = require('express').Router()
const {addCategory, getCategories} = require('../controllers/categoryController')

router.route('/').post(addCategory).get(getCategories)

module.exports = router
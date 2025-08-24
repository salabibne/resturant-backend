const router = require('express').Router()

const {addOrder, getAllOrders, getOrderItems} = require('../controllers/orderController')

router.route('/').post(addOrder).get(getAllOrders)
router.route('/:id/items').get(getOrderItems)

module.exports = router
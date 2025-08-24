const router = require('express').Router()

const {getAllProducts, addProduct, getSingleProduct, updateProduct, deleteProduct, getProductByCategory} = require('../controllers/productController')


router.route('/').get(getAllProducts).post(addProduct)
router.route('/:id').put(updateProduct).delete(deleteProduct)
router.route('/category/:category').get(getProductByCategory)
router.route('/:productName').get(getSingleProduct)


module.exports = router

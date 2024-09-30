const express = require('express')
const { addProduct, updateProduct } = require('../../controller/admin/productController')
const router = express.Router()

router.route('/product').post(addProduct)
// router.route('/product/:id').patch(updateProduct)
module.exports = router





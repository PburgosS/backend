const express = require('express');
const router = express.Router();
const productController = require('../../controllers/productController');

router.post('/createProduct', productController.createProduct);
router.post('/viewAllProducts', productController.getAllProductData);
router.post('/filterProductByBrand', productController.brandFilterProduct);
router.post('/filterProductByCategory', productController.categoryFilterProduct);

module.exports = router;
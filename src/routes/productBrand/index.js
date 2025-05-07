const express = require('express');
const router = express.Router();
const productBrandController = require('../../controllers/productBrandController');

router.post('/createProductBrand', productBrandController.createProductBrand);
router.post('/viewAllProductBrand', productBrandController.getAllProductBrand);

module.exports = router;
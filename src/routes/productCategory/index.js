const express = require('express');
const router = express.Router();
const productCategoryController = require('../../controllers/productCategoryController');

router.post('/createProductCategory', productCategoryController.createProductCategory);
router.post('/viewAllProductCategory', productCategoryController.getAllProductCategories);

module.exports = router;
const express = require("express");
const router = express.Router();
const productArrivalController = require('../../controllers/productArrivalController');

router.post('/createProductArrival', productArrivalController.createProductArrival);
router.post('/getAllProductArrivals', productArrivalController.getAllProductsArrivals);

module.exports = router;
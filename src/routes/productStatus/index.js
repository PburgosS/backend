const express = require("express");
const router = express.Router();
const productStatusController = require('../../controllers/productStatusController');

router.post('/createProductStatus', productStatusController.createProductStatus);
router.post('/getAllProductStatus', productStatusController.viewAllProductStatus);

module.exports = router;
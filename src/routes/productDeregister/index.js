const express = require('express');
const router = express.Router();
const productDeregisterController = require('../../controllers/productDeregisterController');

router.post('/createProductDeregister', productDeregisterController.createProductDeregister);

module.exports = router;
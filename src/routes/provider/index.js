const express = require('express');
const router = express.Router();
const providerController = require('../../controllers/providerController');

router.post('/createProvider', providerController.createProvider);
router.post('/viewAllProviders', providerController.viewAllProviders);

module.exports = router;
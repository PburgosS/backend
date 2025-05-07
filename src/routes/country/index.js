const express = require('express');
const router = express.Router();
const countryController = require('../../controllers/countryController');

router.post('/createCountry', countryController.createCountry);

module.exports = router;
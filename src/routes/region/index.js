const express = require('express');
const router = express.Router();
const regionController = require('../../controllers/regionController');

router.post('/createRegion', regionController.createRegion);

module.exports = router;
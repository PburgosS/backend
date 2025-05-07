const express = require('express');
const router = express.Router();
const viewController = require('../../controllers/viewController');

router.post('/createView', viewController.createViewData);

module.exports = router;
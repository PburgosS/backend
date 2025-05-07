const express = require('express');
const router = express.Router();
const actionController = require('../../controllers/actionController');

router.post('/createAction', actionController.createAction);

module.exports = router;
const express = require('express');
const router = express.Router();
const deptoController = require('../../controllers/deptosController');

router.post('/createDepto',deptoController.createDepto);
router.post('/getAllDeptos',deptoController.getAllDeptos);

module.exports = router;
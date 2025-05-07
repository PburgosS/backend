const express = require('express');
const router = express.Router();
const subdeptoController = require('../../controllers/subdeptoController');

router.post('/createSubdepto', subdeptoController.createSubdepto);
router.post('/getAllSubdeptosOfDepto', subdeptoController.viewAllSubdeptosOfDepto);

module.exports = router;
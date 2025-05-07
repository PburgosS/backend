const express = require('express');
const router = express.Router();
const subdeptoProcessController = require('../../controllers/subdeptoProcessController');

router.post('/createSubdeptoProcess', subdeptoProcessController.createSubdeptoProcess);
router.post('/viewAllSubdeptoProcessOFSubdepto', subdeptoProcessController.viewAllProcessOfSubdepto);

module.exports = router;
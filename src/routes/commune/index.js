const express = require('express');
const router = express.Router();
const communeController = require('../../controllers/communeController');

router.post('/registerCommune', communeController.registerCommune);
router.post('/allCommunesOfRegion', communeController.getAllCommunesOfRegion);

module.exports = router;
const express = require('express');
const router = express.Router();
const permissonController = require('../../controllers/permissonController');

router.post('/createPermisson',permissonController.createPermisson);
router.post('/getAllPermissons', permissonController.getAllPermissons);

module.exports = router;
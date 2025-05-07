const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');

router.post('/createDepto', userController.resgisterUser);
router.post('/setView', userController.setUserMenu);
router.post('/changeUserStatus', userController.changeUserStatus);

module.exports = router;
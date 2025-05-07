const express = require('express');
const router = express.Router();
const homeController = require('../../controllers/homeController');
const mdw = require('../../middlewares/authMiddleware');

router.post('/homeRedirect', mdw.getViewsPerUser, homeController.homeRedirect);

module.exports = router;
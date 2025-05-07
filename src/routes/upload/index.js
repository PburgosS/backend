const express = require('express');
const router = express.Router();
const uploadController = require('../../controllers/uploadController');
const requestController = require('../../controllers/requestController');

router.post('/uploadQuotation/:requestID', requestController.addQuotation ,uploadController.uploadFile);
router.post('/uploadBuyAuthorization/:requestID', requestController.addBuyAuthorization, uploadController.uploadFile);
router.post('/uploadBuyReceipt/:requestID', requestController.addBuyReceipt, uploadController.uploadFile);
router.post('/uploadDeliveryGuide/:requestID', requestController.addDeliveryGuide, uploadController.uploadFile);
router.post('/uploadBuyOrder/:requestID', requestController.addBuyOrders, uploadController.uploadFile);

module.exports = router;
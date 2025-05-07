const express = require('express');
const router = express.Router();
const requestController = require('../../controllers/requestController');

router.post('/createRequest', requestController.createRequest);
router.post('/getAllRequest', requestController.getAllRequest);
router.post('/getAllRequestData', requestController.getAllRequestData);
router.post('/getAllRequestOfDepto', requestController.getRequestByDepto);
router.post('/getAllRequestOfSubdepto', requestController.getRequestBySubdepto);
router.post('/getOwnRequest', requestController.getOwnRequests);
router.post('/getSpecificRequest', requestController.getSpecificRequestData);
router.post('/updateRequestStatus', requestController.updateRequestStatus);
router.post('/getRequestDocumentation', requestController.getRequestDocumentation);

module.exports = router;
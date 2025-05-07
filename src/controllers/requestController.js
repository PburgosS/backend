const requestModel = require('../models/requestModel');
const deptoModel = require('../models/deptosModel');
const productModel = require('../models/productModel');
const Errors = require('../errors/errors');
const validator = require('../utils/validator');
const multer = require('multer');
const fs = require('fs').promises;
const path = require('path');
const log4 = require('log4js');
const logger = log4.getLogger('requestController');
logger.level = 'all';

const createRequest = async (req, res) => {
    try {
        const { requestor, requestDate, requestVia, requestItems , statusName, requestStatusDate, finalUserName, finalUserDepto, finalUserSubDepto, requestorID } = req.body;
        const itemsRequested = [];
        for(let i = 0; i < requestItems.length; i++){
            const { product, quantity } = requestItems[i];
            //Validate Product
            validator.validateIsString(product, 'Product');
            validator.validateIDStructure(product, 'Product');
            //Validate Product Quantity
            validator.validateNumber(quantity, 'Quantity');
            validator.validateMaxNumber(quantity, 'Quantity');
            const productList = {
                product : product,
                quantity : quantity
            };
            itemsRequested.push(productList);
        }
        //Validate Requestor
        validator.validateIsString(requestor, 'Requestor');
        validator.validateStringNameStructure(requestor, 'Requestor');
        validator.validateStringMaxLength(requestor, 'Requestor');
        //Validate Request Date
        validator.validateIsString(requestDate, 'Request Date');
        validator.validateDate(requestDate, 'Request Date');
        //Validate Request Via
        validator.validateIsString(requestVia, 'Request Via');
        validator.validateStringNameStructure(requestVia, 'Request Via');
        validator.validateStringMaxLength(requestVia, 'Request Via');
        //Validate StatusName
        validator.validateIsString(statusName, 'Status Name');
        validator.validateStringNameStructure(statusName, 'Status Name');
        validator.validateStringMaxLength(statusName, 'Status Name');
        //Validate Request Status Date
        validator.validateIsString(requestStatusDate, 'Request Status Date');
        validator.validateDate(requestStatusDate, 'Request Status Date');
        //Validate Final User Name
        validator.validateIsString(finalUserName, 'Final User Name');
        validator.validateStringNameStructure(finalUserName, 'Final User Name');
        validator.validateStringMaxLength(finalUserName, 'Final User Name');
        //Validate Final User Depto
        validator.validateIsString(finalUserDepto, 'Final User Depto');
        validator.validateIDStructure(finalUserDepto, 'Final User Depto');
        //Validate Final User Subdepto
        validator.validateIsString(finalUserSubDepto, 'Final User Subdepto');
        validator.validateIDStructure(finalUserSubDepto, 'Final User Subdepto');
        //Validator Requestor ID
        validator.validateIsString(requestorID, 'Requestor ID');
        validator.validateIDStructure(requestorID, 'Requestor ID');

        const requestStatus = {
            statusName : statusName,
            requestStatusDate : requestStatusDate
        };
        const finalUserDeptoCode = await deptoModel.find({_id : finalUserDepto},'-_id -__v -costCenterNom -costCenterName');
        const finalUser = {
            finalUserName : finalUserName,
            finalUserDepto : finalUserDepto,
            finalUserDeptoCode : finalUserDeptoCode[0].deptoCode,
            finalUserSubDepto : finalUserSubDepto
        };
        const lastDocument = await requestModel.find().sort({$natural : -1}).limit(1);
        let requestIdData = "";
        if(lastDocument == ""){
            requestIdData = 'APP000000000';
        }
        else{
            requestIdData = lastDocument[0].requestID.substring(3,12);
            requestIdData = parseInt(requestIdData, 10) + 1;
            requestIdData = 'APP' + requestIdData.toString().padStart(9,'0');
        }
        const createdRequest = new requestModel({
            requestor: requestor,
            requestItems : itemsRequested,
            requestDate: requestDate,
            requestVia : requestVia,
            requestStatus : requestStatus,
            previousRequestStatus : [],
            finalUser : finalUser,
            requestID : requestIdData,
            requestorID : requestorID
        });
        await createdRequest.save();
        res.status(200).send(createdRequest);
    }catch (error) {
        if(error instanceof Errors){
            res.status(error.code).send(error.getMessage());
        }
        else{
            const msg = {
                'code' : 500,
                'message' : error.message
            }
            res.status(500).send(msg);
        }
    }
}
const getAllRequest = async (req, res) => {
    try {
        const allRequests = await requestModel.find({'requestStatus.statusName' : {$ne : 'Cerrado'}});
        res.status(200).send(allRequests);
    } catch (error) {
        if(error instanceof Errors){
            res.status(error.code).send(error.getMessage());
        }
        else{
            const msg = {
                'code' : 500,
                'message' : error.message
            }
            res.status(500).send(msg);
        }
    }
}
const getAllRequestData = async (req, res) => {
    try {
        let data = [];
        const requestData = await requestModel.find({'requestStatus.statusName' : {$ne : 'Cerrado'}});
        for(let i = 0; i < requestData.length; i++ ){
            data.push({
                requestor: requestData[i].requestor,
                requestDate: requestData[i].requestDate,
                requestStatus : requestData[i].requestStatus,
                finalUserName : requestData[i].finalUser.finalUserName,
                requestID : requestData[i].requestID,
            });
        }
        res.status(200).send(data);
    } catch (error) {
        if(error instanceof Errors){
            res.status(error.code).send(error.getMessage());
        }
        else{
            const msg = {
                'code' : 500,
                'message' : error.message
            }
            res.status(500).send(msg);
        }
    }
}
const getRequestByDepto = async (req, res) => {
    try {
        const { deptoID } = req.body;
        let deptoRequest = [];
        const deptoRequestData = await requestModel.find({'finalUser.finalUserDepto' : deptoID}, {'requestStatus.statusName' : {$ne : 'Cerrado'}});
        for(let i = 0; i < deptoRequestData.length; i++){
            deptoRequest.push({
                requestor: deptoRequestData[i].requestor,
                requestDate: deptoRequestData[i].requestDate,
                requestStatus : deptoRequestData[i].requestStatus,
                finalUserName : deptoRequestData[i].finalUser.finalUserName,
                requestID : deptoRequestData[i].requestID
            });
        }
        res.status(200).send(deptoRequest);
    } catch (error) {
        if(error instanceof Errors){
            res.status(error.code).send(error.getMessage());
        }
        else{
            const msg = {
                'code' : 500,
                'message' : error.message
            }
            res.status(500).send(msg);
        }
    }
}
const getRequestBySubdepto = async (req, res) => {
    try {
        const { subdeptoID } = req.body;
        let subdeptoRequest = [];
        const subdeptoRequestData = await requestModel.find({'finalUser.finalUserSubDepto' : subdeptoID}, {'requestStatus.statusName' : {$ne : 'Cerrado'}});
        for(let i = 0; i < subdeptoRequestData.length; i++){
            subdeptoRequest.push({
                requestor: subdeptoRequestData[i].requestor,
                requestDate: subdeptoRequestData[i].requestDate,
                requestStatus : subdeptoRequestData[i].requestStatus,
                finalUserName : subdeptoRequestData[i].finalUser.finalUserName,
                requestID : subdeptoRequestData[i].requestID
            });
        }
        res.status(200).send(subdeptoRequest);
    } catch (error) {
        if(error instanceof Errors){
            res.status(error.code).send(error.getMessage());
        }
        else{
            const msg = {
                'code' : 500,
                'message' : error.message
            }
            res.status(500).send(msg);
        }
    }
}
const getOwnRequests = async (req, res) => {
    try {
        const { requestorID } = req.body;
        let ownData = [];
        const ownRequestData = await requestModel.find({ requestorID : requestorID }, {'requestStatus.statusName' : {$ne : 'Cerrado'}});
        for(let i = 0; i < ownRequestData.length; i++ ){
            ownData.push({
                requestor: ownRequestData[i].requestor,
                requestDate: ownRequestData[i].requestDate,
                requestStatus : ownRequestData[i].requestStatus,
                finalUserName : ownRequestData[i].finalUser.finalUserName,
                requestID : ownRequestData[i].requestID
            });
        }
        res.status(200).send(ownData);
    } catch (error) {
        if(error instanceof Errors){
            res.status(error.code).send(error.getMessage());
        }
        else{
            const msg = {
                'code' : 500,
                'message' : error.message
            }
            res.status(500).send(msg);
        }
    }
}



const getSpecificRequestData = async (req, res) => {
    try {
        const { requestID } = req.body;
        let quotations;
        const specificRequest = await requestModel.find({ requestID : requestID });
        console.log(specificRequest);
        const finalUserDepto = await deptoModel.find({ _id : specificRequest[0].finalUser.finalUserDepto.toString() }, '-__v -_id');
        let dataRequest = {
            id : specificRequest[0]._id,
            requestor: specificRequest[0].requestor,
            requestItems: specificRequest[0].requestItems,
            requestDate: specificRequest[0].requestDate,
            requestVia : specificRequest[0].requestVia,
            requestStatus : specificRequest[0].requestStatus,
            previousRequestStatus : specificRequest[0].previousRequestStatus,
            finalUser : {
                finalUserName : specificRequest[0].finalUser.finalUserName,
                finalUserDepto : finalUserDepto[0].deptoName
            },
            requestID : specificRequest[0].requestID,
            requestorID : specificRequest[0].requestorID
        }
        res.status(200).send(dataRequest);
    } catch (error) {
        if(error instanceof Errors){
            res.status(error.code).send(error.getMessage());
        }
        else{
            const msg = {
                'code' : 500,
                'message' : error.message
            }
            res.status(500).send(msg);
        }
    }
}



// const getSpecificRequestData = async (req, res) => {
//     try {
//         const { requestID } = req.body;
//         let itemasNameList = [];
//         let quotations;
//         const specificRequest = await requestModel.find({ requestID : requestID });
//         console.log(specificRequest);
//         const finalUserDepto = await deptoModel.find({ _id : specificRequest[0].finalUser.finalUserDepto.toString() }, '-__v -_id');
//         for(let i = 0; i < specificRequest[0].requestItems.length; i++){
//             const productID = specificRequest[0].requestItems[i].product;
//             const itemsNames = await productModel.find({_id: productID}, '-_id -description -productBrandLink -productCategoryLink -__v');
//             const productsQuantity = {
//                 model : itemsNames[0].model,
//                 quantity : specificRequest[0].requestItems[i].quantity
//             }
//             itemasNameList.push(productsQuantity);
//         }
//         let dataRequest = {
//             id : specificRequest[0]._id,
//             requestor: specificRequest[0].requestor,
//             requestItems: itemasNameList,
//             requestDate: specificRequest[0].requestDate,
//             requestVia : specificRequest[0].requestVia,
//             requestStatus : specificRequest[0].requestStatus,
//             previousRequestStatus : specificRequest[0].previousRequestStatus,
//             finalUser : {
//                 finalUserName : specificRequest[0].finalUser.finalUserName,
//                 finalUserDepto : finalUserDepto[0].deptoName
//             },
//             requestID : specificRequest[0].requestID,
//             requestorID : specificRequest[0].requestorID
//         }
//         res.status(200).send(dataRequest);
//     } catch (error) {
//         if(error instanceof Errors){
//             res.status(error.code).send(error.getMessage());
//         }
//         else{
//             const msg = {
//                 'code' : 500,
//                 'message' : error.message
//             }
//             res.status(500).send(msg);
//         }
//     }
// }
const updateRequestStatus = async (req, res) => {
    try {
        const { id, statusName, requestStatusDate } = req.body;
        const getRequestStatus = await requestModel.findOne({_id: id}, 'requestStatus -_id');
        const newRequestStatus = {
            statusName : statusName,
            requestStatusDate : requestStatusDate
        }
        const updateRequestStatus = {
            prevStatusName : getRequestStatus.requestStatus.statusName,
            prevRequestStatusDate : getRequestStatus.requestStatus.requestStatusDate
        }
        const updatedStatus = await requestModel.findByIdAndUpdate({_id : id}, { 
            $set : { requestStatus : newRequestStatus },
            $push : { previousRequestStatus : updateRequestStatus }
        }, { new : true });
        res.status(200).send(updatedStatus);
    } catch (error) {
        if(error instanceof Errors){
            res.status(error.code).send(error.getMessage());
        }
        else{
            const msg = {
                'code' : 500,
                'message' : error.message
            }
            res.status(500).send(msg);
        }
    }
}
const addQuotation = (req, res, next) => {
    const fileType = 'Cotizacion';
    const requestID = req.params.requestID;
    try {
        req.fileType = fileType;
        req.requestID = requestID;
        logger.info("Solicitud seleccionada correctamente");
        logger.info('Pasando a upload Controller');
        next();
    } catch (error) {
        logger.error("Error al seleccionar una solicitud");
    }
}
const addBuyAuthorization = (req, res, next) => {
    const fileType = 'Autorizacion de compra';
    const requestID = req.params.requestID;
    try {
        req.fileType = fileType;
        req.requestID = requestID;
        logger.info("Solicitud seleccionada correctamente");
        next();
    } catch (error) {
        if(error instanceof Errors){
            res.status(error.code).send(error.getMessage());
        }
        else{
            const msg = {
                'code' : 500,
                'message' : error.message
            }
            res.status(500).send(msg);
        }
    }
}
const addBuyReceipt = (req, res, next) => {
    const fileType = 'Factura';
    const requestID = req.params.requestID;
    try {
        req.fileType = fileType;
        req.requestID = requestID;
        logger.info("Solicitud seleccionada correctamente");
        next();
    } catch (error) {
        if(error instanceof Errors){
            res.status(error.code).send(error.getMessage());
        }
        else{
            const msg = {
                'code' : 500,
                'message' : error.message
            }
            res.status(500).send(msg);
        }
    }
}
const addDeliveryGuide = (req, res, next) => {
    const fileType = 'Guia de despacho';
    const requestID = req.params.requestID;
    try {
        req.fileType = fileType;
        req.requestID = requestID;
        logger.info("Solicitud seleccionada correctamente");
        next();
    } catch (error) {
        if(error instanceof Errors){
            res.status(error.code).send(error.getMessage());
        }
        else{
            const msg = {
                'code' : 500,
                'message' : error.message
            }
            res.status(500).send(msg);
        }
    }
}
const addBuyOrders = (req, res, next) => {
    const fileType = 'Orden de compra';
    const requestID = req.params.requestID;
    try {
        req.fileType = fileType;
        req.requestID = requestID;
        logger.info("Solicitud seleccionada correctamente");
        next();
    } catch (error) {
        if(error instanceof Errors){
            res.status(error.code).send(error.getMessage());
        }
        else{
            const msg = {
                'code' : 500,
                'message' : error.message
            }
            res.status(500).send(msg);
        }
    }
}
const getRequestDocumentation = async (req, res) => {
    const { requestId } = req.body;
    let requestDocumentation = [];
    try {
        const buyAuthFolder = path.join(__dirname,'../uploads/files/autorizaciones de compra');
        const quotationsFolder = path.join(__dirname,'../uploads/files/cotizaciones');
        const buyOrderFolder = path.join(__dirname,'../uploads/files/ordenes de compra');
        const buyReceiptFolder = path.join(__dirname,'../uploads/files/facturas de compra');
        const deliveryOrderFolder = path.join(__dirname,'../uploads/files/ordenes de compra');
        const loadedBuyAuthFolder = await fs.readdir(buyAuthFolder);
        const loadedQuotationFolder = await fs.readdir(quotationsFolder); //Carga todos los elementos de la carpeta  12
        const loadedBuyOrderFolder = await fs.readdir(buyOrderFolder);
        const loadedBuyReceiptFolder = await fs.readdir(buyReceiptFolder);
        const loadedDeliveryOrderFolder = await fs.readdir(deliveryOrderFolder);
        //Trae los archivos de la carpeta autorizaciones de compra que coinciden con el id de solicitud
        for(let i = 0; i < loadedBuyAuthFolder.length; i++){
            if(loadedBuyAuthFolder[i].substring(0,12) == requestId){
                requestDocumentation.push(loadedBuyAuthFolder[i]);
            }
        }
        //Trae los archivos de la carpeta cotizaciones que coinciden con el id de solicitud
        for(let j = 0; j < loadedQuotationFolder.length; j++){
            if(loadedQuotationFolder[j].substring(0,12) == requestId){
                requestDocumentation.push(loadedQuotationFolder[j]);
            }
        }
        //Trae los archivos de la carpeta ordenes de compra que coinciden con el id de solicitud
        for(let k = 0; k < loadedBuyOrderFolder.length; k++){
            if(loadedBuyOrderFolder[k].substring(0,12) == requestId){
                requestDocumentation.push(loadedBuyOrderFolder[k]);
            }
        }
        //Trae los archivos de la carpeta facturas de compra que coinciden con el id de solicitud
        for(let l = 0; l < loadedBuyReceiptFolder.length; l++){
            if(loadedBuyReceiptFolder[l].substring(0,12) == requestId){
                requestDocumentation.push(loadedBuyReceiptFolder[l]);
            }
        }
        //Trae los archivos de la carpeta guias de despacho que coinciden con el id de solicitud
        for(let m = 0; m < loadedDeliveryOrderFolder.length; m++){
            if(loadedDeliveryOrderFolder[m].substring(0,12) == requestId){
                requestDocumentation.push(loadedDeliveryOrderFolder[m]);
            }
        }
        res.status(200).send(requestDocumentation);
    } catch (error) {
        if(error instanceof Errors){
            res.status(error.code).send(error.getMessage());
        }
        else{
            const msg = {
                'code' : 500,
                'message' : error.message
            }
            res.status(500).send(msg);
        }
    }
}
module.exports = {
    createRequest,
    getAllRequest,
    getAllRequestData,
    getRequestByDepto,
    getRequestBySubdepto,
    getOwnRequests,
    getSpecificRequestData,
    updateRequestStatus,
    addQuotation,
    addBuyAuthorization,
    addBuyReceipt,
    addDeliveryGuide,
    addBuyOrders,
    getRequestDocumentation
}
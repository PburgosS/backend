const productArrivalModel = require('../models/productArrivalModel');
const productStatusModel = require('../models/productStatusModel');
const validator = require('../utils/validator'); 
const Errors = require('../errors/errors');
const log4 = require('log4js');
const logger = log4.getLogger('productArrivalController');
logger.level = 'all';

const createProductArrival = async (req, res) => {
    const registerCounter = Object.keys(req.body).length;
    const productArrivalData = [];
    const arrivedProductsData = [];
    const defaultProductStatus = await productStatusModel.findOne({productStatusName : 'En Bodega'}, '-productStatusName -__v');
    try {
        for(let i = 0; i < registerCounter; i++){
            const { productArrived, provider, arrivalDate, buyOrder, receipt } = req.body[i];
            for(let j = 0; j < productArrived.length; j++){
                const { product, productSerialNumber} =  productArrived[j];
                //Validate Product Array
                validator.validateIsString(product, 'Product');
                validator.validateStringWithNumberStructure(product, 'Product');
                //Validate serialNumber
                validator.validateIsString(productSerialNumber, 'Serial Number');
                validator.validateStringWithNumberStructure(productSerialNumber, 'Serial Number');
                let productArrivedData = {
                    product : product, 
                    productSerialNumber : productSerialNumber
                }
                arrivedProductsData.push(productArrivedData);
                console.log(arrivedProductsData);
            }
            //Validate Provider 
            validator.validateIsString(provider, 'Provider');
            validator.validateIDStructure(provider, 'Provider');
            //Validate Arrival Date
            validator.validateIsString(arrivalDate, 'ArrivalDate');
            validator.validateDate(arrivalDate, 'ArrivalDate');
            //Validate BuyOrder
            validator.validateIsString(buyOrder, 'Buy Order');
            validator.validateTaxDocument(buyOrder, 'Buy Order');
            //Validate Receipt Document
            validator.validateIsString(receipt, 'Receipt Document');
            validator.validateTaxDocument(receipt, 'Receipt Document');
            let createdProductArrival = new productArrivalModel({
                productArrived : arrivedProductsData,
                provider : provider,
                arrivalDate : arrivalDate,
                buyOrder : buyOrder,
                receipt : receipt,
                actualProductStatus : defaultProductStatus._id,
                historyProductStatus : []
            });
            const productArrival = await createdProductArrival.save();
            productArrivalData.push(productArrival);
        }
        res.status(200).send({ msg : "Ingreso de productos creado correctamente"});
    } catch (error) {
        if(error instanceof Errors){
            res.status(error.code).send(error.getMessage());
        }
        else{
            const msg = {
                'code' : 500,
                'message' : error.message
            }
            res.status(500).json(msg);
        }
    }
}
const getAllProductsArrivals = async (req, res) => {
    try {
        const allProductArrivals =  await productArrivalModel.find();
        res.status(200).send(allProductArrivals);
    } catch (error) {
        if(error instanceof Errors){
            res.status(error.code).send(error.getMessage());
        }
        else{
            const msg = {
                'code' : 500,
                'message' : error.message
            }
            res.status(500).json(msg);
        }
    }
}

module.exports = {
    createProductArrival,
    getAllProductsArrivals
}
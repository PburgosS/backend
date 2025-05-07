const productArrivalModel = require('../models/productArrivalModel');
const productStatusModel = require('../models/productStatusModel');
const validator = require('../utils/validator'); 
const Errors = require('../errors/errors');

const createProductArrival = async (req, res) => {
    const registerCounter = Object.keys(req.body).length;
    const productArrivalData = [];
    const defaultProductStatus = await productStatusModel.findOne({productStatusName : 'En Bodega'}, '-productStatusName -__v');
    try {
        for(let i = 0; i < registerCounter; i++){
            const { product, provider, arrivalDate, buyOrder, receipt } = req.body[i];
            //Validate Product Array
            validator.validateIsArray(product, 'Product');
            validator.validateArrayVoid(product, 'Product');
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
                product : product,
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
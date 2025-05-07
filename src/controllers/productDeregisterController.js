const productDeregisterModel = require('../models/productDeregisterModel');
const validator = require('../utils/validator');
const Errors = require('../errors/errors');
const log4 = require('log4js');
const logger = log4.getLogger('productDeregisterController.js');
logger.level = 'all';

const createProductDeregister = async (req, res) => {
    const registerCounter = Object.keys(req.body).length;
    const productDeregisterData = [];
    const productsDeregistered = [];
    try {
        for(let i = 0; i < registerCounter; i++){
            const { deregisterDate, productDeregistered } = req.body[i];
            validator.validateIsString(deregisterDate, 'deregisterDate');
            validator.validateDate(deregisterDate, 'deregisterDate');
            for(let j = 0; j < productDeregistered.length; j++){
                const { product, serialNumber } = productDeregistered[j];
                validator.validateIsString(product, 'product');
                validator.validateIDStructure(product, 'product');
                validator.validateIsString(serialNumber, 'Serial Number');
                validator.validateStringMaxLength(serialNumber, 'Serial Number');
                validator.validateStringWithNumberStructure(serialNumber, 'Serial Number');
                const productsList = {
                    product : product,
                    serialNumber : serialNumber
                }
                productsDeregistered.push(productsList);
            }
            const createdProductDeregist = new productDeregisterModel({
                deregisterDate : deregisterDate,
                productDeregistered : productsDeregistered
            });
            const deregisteredProducts = await createdProductDeregist.save();
            productDeregisterData.push(deregisteredProducts);
        }
        res.status(200).send(productDeregisterData);
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
    createProductDeregister
}
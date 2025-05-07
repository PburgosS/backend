const productStatusModel = require('../models/productStatusModel');
const validator = require('../utils/validator');
const Errors = require('../errors/errors');

const createProductStatus = async (req, res) => {
    const registerCounter = Object.keys(req.body).length;
    const productStatusData = [];
    try {
        for(let i = 0; i < registerCounter; i++){
            const { productStatusName } = req.body[i];
            validator.validateIsString(productStatusName, 'Product Status Name');
            validator.validateStringNameStructure(productStatusName, 'Product Status Name');
            validator.validateStringMaxLength(productStatusName, 'Product Status Name');
            let createdProductStatus = new productStatusModel({
                productStatusName : productStatusName
            });
            const productStatus = createdProductStatus.save();
            productStatusData.push(productStatus);
        }
        res.status(200).send({msg : "Estado de producto creado correctamente"});
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

const viewAllProductStatus = async (req, res) => {
    try {
        const getAllProductStatus = await productStatusModel.find();
        res.status(200).send(getAllProductStatus)
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
    createProductStatus,
    viewAllProductStatus
}
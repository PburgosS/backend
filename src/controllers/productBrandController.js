const productBrandModel = require('../models/productBrandModel');
const validator = require('../utils/validator');
const Errors = require('../errors/errors');

const createProductBrand = async (req, res) => {
    const registerCounter = Object.keys(req.body).length;
    const productBrandData = [];
    try {
        for(let i = 0; i < registerCounter; i++){
            const { productBrandName } = req.body[i];
            validator.validateIsString(productBrandName, 'Product Brand Name');
            validator.validateStringNameStructure(productBrandName, 'Product Brand Name');
            validator.validateStringMaxLength(productBrandName, 'Product Brand Name');
            let createdProductBrand = new productBrandModel({
                productBrandName : productBrandName
            });
            const productBrand = await createdProductBrand.save();
            productBrandData.push(productBrand);
        }
        res.status(200).send({msg : 'Marca de producto creada correctamente'});
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
const getAllProductBrand = async (req, res) => {
    try {
        const allProductBrand = await productBrandModel.find();
        res.status(200).send(allProductBrand);
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
    createProductBrand,
    getAllProductBrand
}
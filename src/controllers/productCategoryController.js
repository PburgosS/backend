const productCategoryModel = require('../models/productCategoryModel');
const validator = require('../utils/validator');
const Errors = require('../errors/errors');

const createProductCategory = async (req, res) => {
    const total = Object.keys(req.body).length;
    const productCategoryData = [];
    try {
        for(let i = 0; i < total; i++){
            const { productCategoryName } = req.body[i];
            validator.validateIsString(productCategoryName, 'Product Category Name');
            validator.validateStringNameStructure(productCategoryName, 'Product Category Name');
            validator.validateStringMaxLength(productCategoryName, 'Product Category Name');
            if(productCategoryName == null){
                throw new Error("No puede venir vacío");
            }
            const newCategory = new productCategoryModel({
                productCategoryName : productCategoryName
            });
            const category = await newCategory.save();
            productCategoryData.push(category);
        }
        res.status(200).json({msg : 'Categoria Creada correctamente', data : productCategoryData});
    } 
    catch (error) {
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
const getAllProductCategories = async (req, res) => {
    try {
        const allProductCategories = await productCategoryModel.find();
        res.status(200).send(allProductCategories);
    } 
    catch (error) {
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
    createProductCategory,
    getAllProductCategories
}
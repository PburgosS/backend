const productModel = require('../models/productModel');
const productBrandModel = require('../models/productBrandModel');
const productCategoryModel = require('../models/productCategoryModel');
const validator = require('../utils/validator');
const Errors = require('../errors/errors');

const createProduct = async (req, res) => {
    const registerCounter = Object.keys(req.body).length;
    const productData = [];
    try {
        for(let i = 0; i < registerCounter; i++){
            const { model, description, productBrandLink, productCategoryLink } = req.body[i];
            //Validate Model
            validator.validateIsString(model, 'Model');
            validator.validateStringWithNumberStructure(model, 'Model');
            validator.validateStringMaxLength(model, 'Model');
            //Validate Description
            validator.validateIsString(description, 'Description');
            validator.validateTextArea(description, 'Description');
            //Validate Product Brand Link
            validator.validateIsString(productBrandLink, 'Product Brand Link');
            validator.validateIDStructure(productBrandLink, 'Product Brand Link');
            //Validate Product Category Link
            validator.validateIsString(productCategoryLink, 'Product Category Link');
            validator.validateIDStructure(productCategoryLink, 'Product Category Link');
            const createdProduct = new productModel({
                model : model, 
                description : description, 
                productBrandLink : productBrandLink, 
                productCategoryLink : productCategoryLink
            });
            const product = await createdProduct.save();
            productData.push(product);
        }
        res.status(200).send({msg : "Producto registrado correctamente"});
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
const getAllProductData = async (req, res) => {
    try {
        let data = [];
        const productData = await productModel.find();
        for(let i = 0; i < productData.length; i++){
            const productBrandLinkData = await productBrandModel.find({ _id : productData[i].productBrandLink.toString()},'-__v -_id');
            const productCategoryLinkData = await productCategoryModel.find({ _id : productData[i].productCategoryLink.toString()},'-__v -_id');
            data.push({
                model : productData[i].model,
                description : productData[i].description,
                productBrandLink : productBrandLinkData[0].productBrandName,
                productCategoryLink : productCategoryLinkData[0].productCategoryName
            });
        };
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
            res.status(500).json(msg);
        }
    };
}
async function brandFilterProduct(req, res){
    const { brandFilter } = req.body;
    validator.validateIsString(brandFilter, 'Product Brand Filter');
    validator.validateIDStructure(brandFilter, 'Product Brand Filter');
    try {
        let data = [];
        const productData = await productModel.find({ productBrandLink: brandFilter });
        for(let i = 0; i < productData.length; i++){
            const productBrandLinkData = await productBrandModel.find({ _id : productData[i].productBrandLink.toString()},'-__v -_id');
            const productCategoryLinkData = await productCategoryModel.find({ _id : productData[i].productCategoryLink.toString()},'-__v -_id');
            data.push({
                _id : productData[i]._id,
                model : productData[i].model,
                description : productData[i].description,
                productBrandLink : productBrandLinkData[0].productBrandName,
                productCategoryLink : productCategoryLinkData[0].productCategoryName
            });
        };
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
            res.status(500).json(msg);
        }
    };
}
async function categoryFilterProduct(req, res){
    const { categoryFilter } = req.body;
    validator.validateIsString(categoryFilter, 'Product Category Filter');
    validator.validateIDStructure(categoryFilter, 'Product Category Filter');
    try {
        let data = [];
        const productData = await productModel.find({ productCategoryLink: categoryFilter });
        for(let i = 0; i < productData.length; i++){
            const productBrandLinkData = await productBrandModel.find({ _id : productData[i].productBrandLink.toString()},'-__v -_id');
            const productCategoryLinkData = await productCategoryModel.find({ _id : productData[i].productCategoryLink.toString()},'-__v -_id');
            data.push({
                _id : productData[i]._id,
                model : productData[i].model,
                description : productData[i].description,
                productBrandLink : productBrandLinkData[0].productBrandName,
                productCategoryLink : productCategoryLinkData[0].productCategoryName
            });
        };
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
            res.status(500).json(msg);
        }
    };
}

module.exports = {
    createProduct,
    getAllProductData,
    brandFilterProduct,
    categoryFilterProduct
}
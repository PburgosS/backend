const viewsModel = require('../models/viewModel');
const validator = require('../utils/validator');
const Errors = require('../errors/errors');
const log4 = require('log4js');
const logger = log4.getLogger('viewsController.js');
logger.level = 'all';

const createViewData = async (req, res) => {
    const registerCounter = Object.keys(req.body).length;
    const viewData = [];
    try {
        for(let i = 0; i < registerCounter; i++){
            const { viewName, frontPath, viewPermisson, actionLink } = req.body[i];
            //Validations View Name
            validator.validateIsString(viewName, 'viewName');
            validator.validateStringNameStructure(viewName, 'viewName');
            validator.validateStringMaxLength(viewName, 'viewName');
            //Validations Front Path
            validator.validateIsString(frontPath, 'frontPath');
            validator.validateFrontPath(frontPath, 'frontPath');
            validator.validateStringMaxLength(frontPath, 'frontPath');
            //Validations View Permisson
            validator.validateIsString(viewPermisson, 'viewPermisson');
            validator.validatePermissonCode(viewPermisson, 'viewPermisson');
            //Validations Action Link
            validator.validateIsString(actionLink, 'actionLink');
            validator.validateIDStructure(actionLink, 'actionLink');
            const createdView = new viewsModel({
                viewName : viewName,
                frontPath : frontPath,
                viewPermisson : viewPermisson,
                actionLink : actionLink
            });
            const view = await createdView.save();
            viewData.push(view);
        }
        res.status(200).send({msg : "Datos de vista creados correctamente"});
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

const deleteViewData = async (req, res) => {
    const { viewCode } = req.body;
    validator.validateIsString(viewCode, 'View Code');
    validator.validatePermissonCode(viewCode, 'View Code');
    try {
        await viewsModel.deleteOne({_id:viewCode});
        res.status(200).send({msg : "Datos de vista eliminados correctamente"});
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

const getAllDataViews = async (req, res) => {
    try {
        const allDataViews = await viewsModel.find();
        res.status(200).send({allDataViews});
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
    createViewData,
    deleteViewData,
    getAllDataViews,
}
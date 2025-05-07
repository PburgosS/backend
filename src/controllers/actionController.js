const actionModel = require('../models/actionModel');
const validator = require('../utils/validator');
const Errors = require('../errors/errors');
const log4 = require('log4js');
const logger = log4.getLogger("actionController.js");
logger.level = "all";

const createAction = async (req, res) => {
    const registerCounter = Object.keys(req.body).length;
    const actionData = [];
    try {
        for(let i = 0; i < registerCounter; i++){
            const { actionName, processLink } = req.body[i];
            //Validation Action Name
            validator.validateIsString(actionName, 'actionName');
            validator.validateStringNameStructure(actionName, 'actionName');
            validator.validateStringMaxLength(actionName, 'actionName');
            //Validation Process Link
            validator.validateIsString(processLink, 'processLink');
            validator.validateIDStructure(processLink, 'processLink');
            const createdAction = new actionModel({
                actionName : actionName,
                processLink : processLink
            });
            const action = await createdAction.save();
            actionData.push(action);
        }
        res.status(200).send({msg : "Accion creada correctamente"});
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
const viewAllActions = async (req,res) => {
    try {
        const allActions = await actionModel.find();
        res.status(200).send(allActions);
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
const getAllActionsByProcess = async (req, res) => {
    const { processLink } = req.body;
    validator.validateIsString(processLink, 'processLink');
    validator.validateIDStructure(processLink, 'processLink');
    try {
        const actionByFunction = await actionModel.find({processLink : processLink});
        res.status(200).send(actionByFunction);
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
    createAction,
    viewAllActions,
    getAllActionsByProcess
}
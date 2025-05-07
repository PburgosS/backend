const subdeptoProcessModel = require('../models/subdeptoProcessModel');
const validator = require('../utils/validator');
const Errors = require('../errors/errors');
const log4 = require('log4js');
const logger = log4.getLogger('subdeptoProcessController');
logger.level = 'all';

const createSubdeptoProcess = async (req, res) => {
    const registerCounter = Object.keys(req.body).length;
    const subdeptoProcessData = [];
    try {
        for(let i = 0; i < registerCounter; i++){
            const { subdeptoProcessName, subdeptoLink } = req.body[i];
            //Validations Subdepto Process Name
            validator.validateIsString(subdeptoProcessName, 'subdeptoProcessName');
            validator.validateStringNameStructure(subdeptoProcessName, 'subdeptoProcessName');
            //Validations Subdepto Link
            validator.validateIsString(subdeptoLink, 'subdeptoLink');
            validator.validateIDStructure(subdeptoLink, 'subdeptoLink');
            const createdSubdeptoProcess = new subdeptoProcessModel({
                subdeptoProcessName : subdeptoProcessName,
                subdeptoLink : subdeptoLink
            });
            const subdeptoProcess = await createdSubdeptoProcess.save();
            subdeptoProcessData.push(subdeptoProcess);
        }
        res.status(200).send({msg : "Funcion de Subdepatamento creada y asignada correctamente"});
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
const viewAllProcessOfSubdepto = async (req, res) => {
    const { subdeptoLink } = req.body;
    validator.validateIsString(subdeptoLink, 'subdeptoLink');
    validator.validateIDStructure(subdeptoLink, 'subdeptoLink');
    const getSubDeptoFunction = await subdeptoProcessModel.find({subdeptoLink :subdeptoLink},'-__v -subdeptoLink');
    try {
        res.status(200).send(getSubDeptoFunction)
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
    createSubdeptoProcess,
    viewAllProcessOfSubdepto
}
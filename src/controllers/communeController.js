const communeModel = require('../models/communeModel');
const validator = require('../utils/validator');
const Errors = require('../errors/errors');
const log4 = require('log4js');
const logger = log4.getLogger('communeController.js');
logger.level = 'all';

const registerCommune = async (req, res) => {
    const registerCounter = Object.keys(req.body).length;
    const communeData = [];
    try {
        for(let i = 0; i < registerCounter; i++){
            const { communeName, communeLocode, regionLink } = req.body[i];
            //Validations Commune Name
            validator.validateIsString(communeName, 'communeName');
            validator.validateStringNameStructure(communeName, 'communeName');
            validator.validateStringMaxLength(communeName, 'communeName');
            //Validations Commune Locode
            validator.validateIsString(communeLocode, 'communeLocode');
            validator.validateLoCodeString(communeLocode, 'communeLocode');
            //Validations Region Link
            validator.validateIsString(regionLink, 'regionLink');
            validator.validateIDStructure(regionLink, 'regionLink');
            const createdCommune = new communeModel({
                communeName : communeName,
                communeLocode : communeLocode,
                regionLink : regionLink
            });
            const commune = await createdCommune.save();
            communeData.push(commune);
        }
        res.status(200).send({msg : "Comuna registrada correctamente"});
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
const getAllCommunesOfRegion = async (req, res) => {
    const { regionLink } = req.body;
    validator.validateIsString(regionLink, 'regionLink');
    validator.validateIDStructure(regionLink, 'regionLink');
    try {
        const communesOfRegion = await communeModel.find({regionLink : regionLink});
        res.status(200).send(communesOfRegion);
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
    registerCommune,
    getAllCommunesOfRegion
}
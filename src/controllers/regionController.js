const regionModel = require('../models/regionModel');
const validator = require('../utils/validator');
const Errors = require('../errors/errors');

const createRegion = async (req, res) => {
    const registerCounter = Object.keys(req.body).length;
    const regionData = [];
    try {
        for(let i = 0; i < registerCounter; i++){
            const { regionName, regionISOCode, countryLink } = req.body[i];
            //Validations Region Name
            validator.validateStringNameStructure(regionName, 'Region Name');
            validator.validateStringMaxLength(regionName, 'Region Name');
            validator.validateIsString(regionName, 'Region Name');
            //Validations Region ISO Code
            validator.validateIsString(regionName, 'Region Name');
            validator.validateISOString(regionName, 'Region Name');
            //Validations Country Link
            validator.validateIsString(countryLink, 'Country Link');
            validator.validateIDStructure(countryLink, 'Country Link');
            const createdRegion = new regionModel({
                regionName : regionName,
                regionISOCode : regionISOCode,
                countryLink : countryLink
            });
            const region = await createdRegion.save();
            regionData.push(region);
        }
        res.status(200).send({msg : "Region agregada correctamente"});
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
const viewAllRegions = async (req, res) => {
    try {
        const allRegions = await regionModel.find();
        res.status(200).send(allRegions);
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
    createRegion,
    viewAllRegions
}
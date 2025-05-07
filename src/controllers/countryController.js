const countryModel = require('../models/countryModel');
const validator = require('../utils/validator');
const Errors = require('../errors/errors');
const log4 = require('log4js');
const logger = log4.getLogger('countryController.js');
logger.level = 'all';

const createCountry = async (req, res) => {
    const registerCounter = Object.keys(req.body).length;
    const countryData = [];
    try {
        for(let  i = 0; i < registerCounter; i++){
            const { countryName, countryIataCode } = req.body[i];
            //Validations Country Name
            validator.validateIsString(countryName, 'Country Name');
            validator.validateStringNameStructure(countryName, 'Country Name');
            validator.validateStringMaxLength(countryName, 'Country Name');
            //Validations Country Iata Code
            validator.validateIsString(countryIataCode, 'Country Iata Code');
            validator.validateIataString(countryIataCode, 'Country Iata Code');
            const createdCountry = new countryModel({
                countryName : countryName,
                countryIataCode : countryIataCode.toUpperCase()
            });
            const country = await createdCountry.save()
            countryData.push(country);
        }
        res.status(200).send({msg : "Pais Agregado correctamente"});
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
const viewAllCountries = async (req, res) => {
    try {
        const allCountries = await countryModel.find();
        res.status(200).send(allCountries);
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
    createCountry,
    viewAllCountries
}
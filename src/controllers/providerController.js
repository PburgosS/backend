const providerModel = require('../models/providerModel');
const validator = require('../utils/validator');
const Errors = require('../errors/errors');

const createProvider = async (req, res) => {
    const registerCounter = Object.keys(req.body).length;
    const providerData = [];
    try {
        for(let i = 0; i < registerCounter; i++){
            const { providerRut, providerRegisteredName, providerFantasyName,market, address, countryCommune } = req.body[i];
            //Validate Provider RUT
            validator.validateIsString(providerRut, 'Provider RUT');
            validator.validateRUT(providerRut, 'Provider RUT');
            //Validate Provider Registered Name
            validator.validateIsString(providerRegisteredName, 'Provider Registered Name');
            validator.validateStringNameStructure(providerRegisteredName, 'Provider Registered Name');
            //Validate Provider Fantasy Name
            validator.validateIsString(providerFantasyName, 'Provider Fantasy Name');
            validator.validateStringNameStructure(providerFantasyName, 'Provider Fantasy Name');
            validator.validateStringMaxLength(providerFantasyName, 'Provider Fantasy Name');
            //Validate Market
            validator.validateIsString(market, 'Market');
            validator.validateStringNameStructure(market, 'Market');
            validator.validateStringMaxLength(market, 'Market');
            //Validate Address
            validator.validateIsString(address, 'Address');
            validator.validateStringMaxLength(address, 'Address');
            validator.validateTextArea(address, 'Address');
            //Validate Country Commune
            validator.validateIsString(countryCommune, 'Commune');
            validator.validateIDStructure(countryCommune, 'Commune');
            const createdProvider = new providerModel({
                providerRut : providerRut,
                providerRegisteredName : providerRegisteredName,
                providerFantasyName : providerFantasyName,
                market : market,
                address : address,
                countryCommune : countryCommune
            });
            const provider = await createdProvider.save();
            providerData.push(provider);
        }
        res.status(200).send({msg : 'Proveedor registrado correctamente'});
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
const viewAllProviders = async (req, res) => {
    try {
        const getProviders = await providerModel.find();
        res.status(200).send(getProviders);
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
    createProvider,
    viewAllProviders
}
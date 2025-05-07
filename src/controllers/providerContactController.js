const providerContactModel = require('../models/providerContactModel');
const validator = require('../utils/validator');
const Errors = require('../errors/errors');
const log4 = require('log4js');
const logger = log4.getLogger('providerContactController');
logger.level = 'all';

const createContact = async (req, res) => {
    const registerCounter = Object.keys(req.body).length;
    const providerContactData = [];
    try {
        for(let i = 0; i < registerCounter; i++){
            const { providerContactName, providerContactEmail, providerContactNumber, providerId } = req.body[i];
            //Validate Provider Contact
            validator.validateIsString(providerContactName, 'Provider Contact Name');
            validator.validateStringNameStructure(providerContactName, 'Provider Contact Name');
            validator.validateStringMaxLength(providerContactName, 'Provider Contact Name');
            //Validate Provider Contact Email
            validator.validateIsString(providerContactEmail, 'Provider Contact Email');
            validator.validateEmailStructure(providerContactEmail, 'Provider Contact Email');
            //Validate Provider Contact Number
            validator.validateIsString(providerContactNumber, 'Provider Contact Number');
            validator.validateTelephone(providerContactNumber, 'Provider Contact Number');
            //Validate Provider ID
            validator.validateIsString(providerId, 'Provider ID');
            validator.validateIDStructure(providerId, 'Provider ID');
            const createdProviderContact = new providerContactModel({
                providerContactName: providerContactName,
                providerContactEmail: providerContactEmail,
                providerContactNumber: providerContactNumber,
                provider: providerId
            });
            const providerContact = createdProviderContact.save();
            providerContactData.push(providerContact);
        }
        res.status(200).send({msg : "Contacto creado correctamente"});
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
const setContactToNewProvider = async (req, res) =>{
    const { contactId, providerContactEmail, providerContactNumber, providerId } = req.body;
    //Validate Contact ID
    validator.validateIsString(contactId, 'Contact ID');
    validator.validateIDStructure(contactId, 'Contact ID');
    //Validate Provider Contact ID
    validator.validateIsString(providerContactEmail, 'Provider Contact Email');
    validator.validateEmailStructure(providerContactEmail, 'Provider Contact Email');
    //Validate Provider Contact Number
    validator.validateIsString(providerContactNumber, 'Provider Contact Number');
    validator.validateTelephone(providerContactNumber, 'Provider Contact Number');
    //Validate Provider ID
    validator.validateIsString(providerId, 'Provider ID');
    validator.validateIDStructure(providerId, 'Provider ID');
    try {
        await providerContactModel.findOneAndUpdate({_id: contactId},{
            providerContactEmail : providerContactEmail,
            providerContactNumber : providerContactNumber,
            providerId : providerId
        });
        res.status(200).send({msg : "Contacto actualizado correctamente"});
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
    createContact,
    setContactToNewProvider
}
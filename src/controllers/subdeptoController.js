const subdeptoModel = require('../models/subdeptoModel');
const validator = require('../utils/validator');
const Errors = require('../errors/errors');

const createSubdepto = async (req, res) => {
    const registerCounter = Object.keys(req.body).length;
    let subdeptoData = [];
    try {
        for(let i = 0; i < registerCounter; i++){
            const { subdeptoName, deptoLink } = req.body[i];
            //Validation Subdepto Name
            validator.validateIsString(subdeptoName, 'subdeptoName');
            validator.validateStringWithNumberStructure(subdeptoName, 'subdeptoName');
            validator.validateStringMaxLength(subdeptoName, 'subdeptoName');
            //Validation Depto Link
            validator.validateIsString(deptoLink, 'deptoLink');
            validator.validateIDStructure(deptoLink, 'deptoLink');
            const createdSubdepto = new subdeptoModel({
                subdeptoName : subdeptoName,
                deptoLink : deptoLink
            });
            const subdepto = await createdSubdepto.save()
            subdeptoData.push(subdepto);
        }
        res.status(200).send({msg : "subdepartamento creado correctamente"});
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
const viewAllSubdeptosOfDepto = async (req, res) => {
    const { deptoLink } = req.body;
    validator.validateIsString(deptoLink, 'deptoLink');
    validator.validateIDStructure(deptoLink, 'deptoLink');
    const getSubDeptos = await subdeptoModel.find({deptoLink: deptoLink}, '-__v -deptoLink');
    try {
        res.status(200).send(getSubDeptos);
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
    createSubdepto,
    viewAllSubdeptosOfDepto
}
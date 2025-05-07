const deptosModel = require('../models/deptosModel');
const validator = require('../utils/validator');
const Errors = require('../errors/errors');

const createDepto = async (req, res) =>{
    const registerCounter = Object.keys(req.body).length;
    const deptosData = [];
    try {
        for(let i = 0; i < registerCounter; i++){
            const { deptoCode, deptoName, deptoNom } = req.body[i];
            //Validate Depto Code
            validator.validateIsString(deptoCode, 'deptoCode');
            validator.validateDeptoCode(deptoCode, 'deptoCode');
            //Validate Depto Name
            validator.validateIsString(deptoName, 'deptoName');
            validator.validateStringNameStructure(deptoName, 'deptoName');
            validator.validateStringMaxLength(deptoName, 'deptoName');
            //Validate Depto Nom
            validator.validateIsString(deptoNom, 'deptoNom');
            validator.validateDeptoNomStructure(deptoNom);
            const createdDepto = new deptosModel({
                deptoCode : deptoCode,
                deptoName : deptoName,
                deptoNom :deptoNom
            });
            const depto = await createdDepto.save();
            deptosData.push(depto);
        }
        res.status(200).send({msg : 'Departamento creado correctamente'});
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

const getAllDeptos = async (req, res) =>{
    try {
        const allCostCenters = await deptosModel.find();
        res.status(200).send(allCostCenters);
    } catch (error) {
        if(error instanceof Errors){
            res.status(error.code).send(error.getMessage());
        }
        else{
            const msg = {
                'code' : 404,
                'message' : error.message
            }
            res.status(404).json(msg);
        }
    }
}

module.exports = {
    createDepto,
    getAllDeptos
}
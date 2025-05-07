const permissonModel = require('../models/permissonModel');
const validator = require('../utils/validator');
const Errors = require('../errors/errors');

const createPermisson = async (req, res) => {
    const registerCounter = Object.keys(req.body).length;
    const permissonData = [];
    try {
        for(let i = 0; i < registerCounter; i++){
            const { permissonCode, permissonName, postName } = req.body[i];
            //Validate Permisson Code
            validator.validateIsString(permissonCode, 'Permisson Code');
            validator.validatePermissonCode(permissonCode, 'Permisson Code');
            //Validate Permisson Name
            validatorvalidateIsString(permissonName, 'Permisson Name');
            validatorvalidateStringNameStructure(permissonName.trim(), 'Permisson Name');
            validatorvalidateStringMaxLength(permissonName, 'Permisson Name');
            //Validate Post Name
            validatorvalidateIsString(postName, 'Permisson Post Name');
            validatorvalidateStringNameStructure(postName.trim(), 'Permisson Post Name');
            validatorvalidateStringMaxLength(postName, 'Permisson Post Name');
            const createdPermisson = new permissonModel({
                permissonCode : permissonCode,
                permissonName : permissonName,
                postName : postName
            });
            const permisson = await createdPermisson.save();
            permissonData.push(permisson);
        }
        res.status(200).send({msg : "Permiso creado correctamente"});
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

const getAllPermissons = async (req, res) => {
    try {
        const allPermissons = await permissonModel.find();
        res.status(200).send(allPermissons);
    } catch (error) {
        if(error instanceof Errors){
            res.status(error.code).send(error.getMessage());
        }
        else{
            const msg = {
                'code' : 404,
                'message' : error.message
            }
            res.status(404).send(msg);
        }
    }
}

module.exports = {
    createPermisson,
    getAllPermissons
}
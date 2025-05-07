const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');
const permissonModel = require('../models/permissonModel');
const validator = require('../utils/validator');
const Errors = require('../errors/errors');
const log4 = require('log4js');
const logger = log4.getLogger('userController.js');
logger.level = 'all';

const resgisterUser = async (req, res) =>{
    const registerCounter = Object.keys(req.body).length;
    const userData = [];
    const salt = bcrypt.genSaltSync(10);
    try {
        for(let i = 0; i < registerCounter; i++){
            const { firstname, secondname, lastname, secondSurname, email, username, password, depto, subDepto, permissonName } = req.body[i];
            //Validate First Name
            validator.validateIsString(firstname, 'firstname');
            validator.validateStringNameStructure(firstname, 'firstname');
            validator.validateStringMaxLength(firstname, 'firstname');
            //Validate Second Name
            validator.validateIsString(secondname, 'Second Name');
            validator.validateStringNameStructure(secondname, 'Second Name');
            validator.validateStringMaxLength(secondname, 'Second Name');
            //Validate Last Name
            validator.validateIsString(lastname, 'Last Name');
            validator.validateStringNameStructure(lastname, 'Last Name');
            validator.validateStringMaxLength(lastname, 'Last Name');
            //Validate Second Surname
            validator.validateIsString(secondSurname, 'Second Surname');
            validator.validateStringNameStructure(secondSurname, 'Second Surname');
            validator.validateStringMaxLength(secondSurname, 'Second Surname');
            //Validate Email
            validator.validateIsString(email, 'Email');
            validator.validateEmailStructure(email);
            validator.validateStringMaxLength(email, 'Email');
            //Validate User Name
            validator.validateIsString(username, 'User Name');
            validator.validateStringNameStructure(username, 'User Name');
            validator.validateStringMaxLength(username, 'User Name');
            //Validate Permisson
            validator.validateIsString(permissonName, 'Pemrisson Name');
            validator.validateStringNameStructure(permissonName.trim(), 'Pemrisson Name');
            validator.validateStringMaxLength(permissonName, 'Pemrisson Name');
            //Validate Password
            validator.validateIsString(password, 'Password');
            validator.validatePassword(password);
            //Validate Depto
            validator.validateIsString(depto, 'Depto');
            validator.validateIDStructure(depto, 'Depto');
            //Validate Subdepto
            validator.validateIsString(subDepto, 'Subdepto');
            validator.validateIDStructure(subDepto, 'Subdepto');
            const hashPassword = bcrypt.hashSync(password, salt);
            const permissonFind = await permissonModel.findOne({permissonName : permissonName});
            const createdUser = new userModel({
                firstname : firstname,
                secondname : secondname,
                lastname : lastname,
                secondSurname : secondSurname,
                email : email.toLowerCase(),
                username : username.toLowerCase(),
                permisson : permissonFind,
                password : hashPassword,
                depto : depto,
                subdepto : subDepto,
                userMenu : []
            });
            const user = await createdUser.save();
            userData.push(user);
        }
        res.status(200).send(createdUser);
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

const setUserMenu = async (req, res) => {
    const { id, viewID } = req.body;
    //Validate User ID
    validator.validateIsString(id, 'User ID');
    validator.validateIDStructure(id, 'User ID');
    //Validate ViewID
    validator.validateIsString(viewID, 'View ID');
    validator.validateIDStructure(viewID, 'View ID');
    try {
        const userFilter = { _id : id };
        let menuToPush = viewID;
        let updateMenu = {
            $push : {
                userMenu : { $each : menuToPush },
            },
        };
        await userModel.updateOne(userFilter, updateMenu);
        res.status(200).send({msg : "Menú Asignado Correctamente"});
    } catch (error) {
        logger.error(error.message);
        res.status(504).send({msg : "Error al Asignar el menú"});
    }
}

const changeUserStatus = async (req, res) => {
    const { id } = req.body;
    validator.validateIsString(id, 'User ID');
    validator.validateIDStructure(id, 'User ID');
    const findedUser = await userModel.findById(id);
    const actualStatus = findedUser.active;
    try {
        if(actualStatus == true){
            var newUserStatus = !actualStatus;
            await userModel.findByIdAndUpdate(id, {$set : {active: newUserStatus}});
            res.status(200).send({msg : "Estado Cambiado a Inactivo"});
        }else if(actualStatus == false){
            var newUserStatus = !actualStatus;
            await userModel.findByIdAndUpdate(id, {$set : {active: newUserStatus}});
            res.status(200).send({msg : "Estado Cambiado a Activo"});
        }
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
    resgisterUser,
    setUserMenu,
    changeUserStatus
}
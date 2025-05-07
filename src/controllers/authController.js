const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');
const Errors = require('../errors/errors');
const jwt = require('../utils/jwt');
const log4 = require('log4js');
const logger = log4.getLogger();
logger.level = 'all';

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if(!username){
            throw new Error('Username is required');
        }
        if(!password){
            throw new Error('Password is required');
        }
        let datosUsuario = await userModel.findOne({username: username});
        if(!datosUsuario){
            throw new Error('Error en las credenciales');
        }
        let contraseña = await bcrypt.compare(password, datosUsuario.password);
        if(!contraseña){
            throw new Error('Error en las credenciales');
        }
        if(!datosUsuario.active){
            throw new Error('Usuario deshabilitado');
        }
        const accToken = jwt.createAccessToken(datosUsuario);
        const rfrToken = jwt.createRefreshToken(datosUsuario);
        const dataToken = jwt.createEncriptedUserViews(datosUsuario);

        res.status(200).send({
            msg : 'Acceso Autorizado',
            access : accToken,
            refresh : rfrToken,
            dataUser : dataToken
        });
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
    login
}
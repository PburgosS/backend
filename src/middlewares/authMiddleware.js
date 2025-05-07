const jwt = require('../utils/jwt');
const Errors = require('../errors/errors');

const viewModel = require('../models/viewModel');
const userModel = require('../models/userModel');
const deptoModel = require('../models/deptosModel');
const subdeptoModel = require('../models/subdeptoModel');
const subdeptoProcessModel = require('../models/subdeptoProcessModel');
const actionModel = require('../models/actionModel');

const log4 = require('log4js');
const logger = log4.getLogger('authMiddleware');
logger.level = 'all';

const asureAuth = (req, res, next) => {
    if(!req.headers.authorization){
        logger.trace('Network Authentication Required');
        return res.status(511).send({msg : "Token no Existe"});
    }
    const token = req.headers.authorization.replace("Bearer ", "");
    try {
        const payload = jwt.decoded(token);
        const { expired } = payload;
        const currentData = new Date().getTime();
        if(expired <= currentData){
            return res.status(511).send({msg : "El token a expirado"});
        }
        req.user = payload;
        next();
    } catch (error) {
        logger.trace('Network Authentication required');
        res.status(510).send({msg : 'Token Invalido'});
    }
}

const getViewsPerUser = async (req, res, next) => {
    try {
        const token = req.body.dataUser;
        const payload = jwt.decoded(token);
        const views = payload.userViews;
        const userID = payload.user_id;
        const deptoArray = [];
        const subDeptoArray = [];
        const processArray = [];
        const actionArray = [];
        const link = [];
        const userData = await userModel.findById(userID);
        console.log(userData);
        const userAccess = userData.permisson.permissonCode;
        const userDepto = userData.depto;
        const userSubDepto = userData.subdepto;
        if(!userData){
            throw new Error("Usuario no Autorizado par Ingreso");
        }
        for(let i = 0; i < views.length; i++){
            let view = await viewModel.findById(views[i]);//TRAE LOS DATOS DE CADA VISTA INDIVIDUAL
            let actionView = await actionModel.findById(view.actionLink.toString());//TRAE LOS DATOS DE LA ACCION ASOCIADA A LA VISTA
            let processView = await subdeptoProcessModel.findById(actionView.processLink.toString());//TRAE LOS DATOS DEL PROCESO ASOCIADO A LA VISTA
            let subDeptoView = await subdeptoModel.findById(processView.subdeptoLink.toString());//TRAE LOS DATOS DEL SUBDEPTO ASOCIADO A LA VISTA
            let deptoView = await deptoModel.findById(subDeptoView.deptoLink.toString());//TRAE LOS DATOS DEL DEPARTAMENTO ASOCIADO A LA VISTA
            let subDeptoExist = subDeptoArray.some((subItem) => subItem.key === subDeptoView._id.toString());
            if(!subDeptoExist){
                subDeptoArray.push({ 
                    "key" : subDeptoView._id.toString(), 
                    "nombre" : subDeptoView.subdeptoName, 
                    "link" : deptoView.deptoName, 
                    "depto" : deptoView._id.toString(), 
                    "children" : [] 
                });
            }
            let actionExist = actionArray.some((actionItem) => actionItem.key === actionView._id.toString());
            if(!actionExist){
                actionArray.push({
                    "key" : actionView._id.toString(),
                    "nombre" : actionView.actionName,
                    "proceso" : processView._id.toString(),
                    "link" : view.frontPath
                });
            }
            let processExist = processArray.some((processItem) => processItem.key === processView._id.toString());
            if(!processExist){
                processArray.push({
                    "key" : processView._id.toString(),
                    "nombre" : processView.subdeptoProcessName,
                    "link" : processView.subdeptoProcessName,
                    "subDepto" : processView.subdeptoLink.toString(),
                    "children" : []
                });
            }
            let deptoExist = deptoArray.some((deptoItem) => deptoItem.key === deptoView._id.toString());
            if(!deptoExist){
                deptoArray.push({
                    "key" : deptoView._id.toString(),
                    "nombre" : deptoView.deptoName,
                    "children" : []
                });
            }
        }
        deptoArray.sort((a,b) => {
            if(a.key > b.key){
                return 1;
            }
            if(a.key < b.key){
                return -1;
            }
            return 0;
        });
        subDeptoArray.sort((a,b) => {
            if(a.depto > b.depto){
                return 1;
            }
            if(a.depto < b.depto){
                return -1;
            }
            return 0;
        });
        actionArray.sort((a,b) => {
            if(a.proceso > b.proceso){
                return 1;
            }
            if(a.proceso < b.proceso){
                return -1;
            }
            return 0;
        });
        processArray.sort((a,b) => {
            if(a.subDepto > b.subDepto){
                return 1;
            }
            if(a.subDepto < b.subDepto){
                return -1;
            }
            return 0;
        });
        for(let procIndex = 0; procIndex < processArray.length; procIndex++){
            for(let actionIndex = 0; actionIndex < actionArray.length; actionIndex++){
                if(processArray[procIndex].key === actionArray[actionIndex].proceso){
                    processArray[procIndex].children.push(actionArray[actionIndex]);
                }
            }
        }
        for(let subDeptoIndex = 0; subDeptoIndex < subDeptoArray.length; subDeptoIndex++){
            for(let procIndex = 0; procIndex < processArray.length; procIndex++){
                if(subDeptoArray[subDeptoIndex].key === processArray[procIndex].subDepto){
                    subDeptoArray[subDeptoIndex].children.push(processArray[procIndex]);
                }
            }
        }
        for(let deptoIndex = 0; deptoIndex < deptoArray.length; deptoIndex++){
            for(let subDeptoIndex = 0; subDeptoIndex < subDeptoArray.length; subDeptoIndex++){
                if(deptoArray[deptoIndex].key === subDeptoArray[subDeptoIndex].depto){
                    deptoArray[deptoIndex].children.push(subDeptoArray[subDeptoIndex]);
                }
            }
        }
        link.push({"menu" : deptoArray});
        link.push({"userNameData" : userData.firstname + " " + userData.secondname + " " + userData.lastname + " " + userData.secondSurname});
        link.push({"user" : userID});
        link.push({"userAccess" : userAccess}, {'userDepto' : userDepto}, {'userSubDepto' : userSubDepto});
        res.status(200).send(link);
        logger.fatal(link)
        next();
    } catch (error) {
        logger.error(error);
        res.status(504).send(error.message);
    }
}

module.exports = {
    asureAuth,
    getViewsPerUser
}
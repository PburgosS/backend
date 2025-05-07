const log4 = require('log4js');
const logger = log4.getLogger('homeController.js');
logger.level = 'all';

const homeModel = require('../models/homeModel');

const homeRedirect = (req, res) => {
    let userData;
    const emptySave = new homeModel({});
    try {
        emptySave.save();
        logger.info('Correcto');
        userData = req.user
        res.status(200).send(userData);
    } catch (error) {
        logger.error('No encontrado');
        res.status(404).send({msg : "Not Found"});
    }
}

module.exports = {
    homeRedirect
}
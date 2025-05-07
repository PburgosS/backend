const upload = require('../utils/multerConfig');
const log4 = require('log4js');
const logger = log4.getLogger('uploadController.js');
logger.level = 'all';

const uploadFile = (req, res) => {
    upload(req, res, function (error) {
        try {
            res.status(200).send({msg : 'Archivo añadido correctamnte'});
        } catch (error) {
            logger.error(error.message);
            res.status(504).send({msg : 'Error al subir el archivo'});
        }
    });
}

module.exports = {
    uploadFile
}
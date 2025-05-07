const multer = require('multer');
const log4 = require('log4js');
const logger = log4.getLogger('uploadController.js');
logger.level = 'all';

//CONFIGURACION DE MULTER
const storage = multer.diskStorage({
    destination : function(req, file, cb) {
        const fileType = req.fileType;
        switch(fileType){
            case 'Cotizacion':
                cb(null, `src/uploads/files/cotizaciones`);
            break;
            case 'Autorizacion de compra':
                cb(null, `src/uploads/files/autorizaciones de compra`);
            break;
            case 'Orden de compra':
                cb(null, `src/uploads/Files/ordenes de compra`);
            break;
            case 'Factura':
                cb(null, `src/uploads/Files/facturas de compra`);
            break;
            case 'Guia de despacho':
                cb(null, `src/uploads/Files/guias de despacho`);
            break;
        }
    },
    filename: function(req, file, cb) {
        const date = new Date().toISOString().split('T')[0];
        const hour = new Date();
        const fileIdLink = req.requestID;
        switch (file.mimetype) {
            case 'application/pdf':
                cb(null, `${fileIdLink}-${date}-${hour.getTime()}-${file.originalname}`);
                break;
            case 'image/png':
                cb(null, `${fileIdLink}-${date}-${hour.getTime()}-${file.originalname}`);
                break;
            case 'image/jpeg':
                cb(null, `${fileIdLink}-${date}-${hour.getTime()}-${file.originalname}`);
                break;
            default:
                logger.error('El archivo debe ser formato PDF, imagen o msg de outlook');
                break;
        }
    }
});

const upload = multer({ 
    storage: storage 
}).single('myFile');

module.exports = upload;
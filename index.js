const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const log4 = require('log4js');
const logger = log4.getLogger('index.js');
logger.level = "all";
mongoose.set('strictQuery',false);
const app = require('./app');

let APPORT = undefined;
let URI = undefined;
let nodeenv = process.env.NODE_ENV;
switch (nodeenv) {
    case 'production':
        APPORT = 3030;
        URI = `mongodb://prd_${process.env.DB_USER}:${process.env.DB_PASS}p@${process.env.DB_HOST}PRD/prd_${process.env.DB_NAME}?${process.env.DB_AUTH}`;
        break;
    case 'testing':
        APPORT = 3040;
        URI = `mongodb://tst_${process.env.DB_USER}:${process.env.DB_PASS}t@${process.env.DB_HOST}TST/tst_${process.env.DB_NAME}?${process.env.DB_AUTH}`;
        break;
    case 'development':
        APPORT = 3050;
        URI = `mongodb://dev_${process.env.DB_USER}:${process.env.DB_PASS}d@${process.env.DB_HOST}DEV/dev_${process.env.DB_NAME}?${process.env.DB_AUTH}`;
        break;
        
}

(async () => {
try {
    logger.info(URI);
    await mongoose.connect(URI);
    logger.info('OK CONEXION');
    await app.listen(APPORT,() =>{
        logger.debug('DB ACCESS SUCCESS');
        logger.debug(`SERVER IS RUNING IN http://${process.env.IP_SERV}:${APPORT}/${process.env.API_VER}`)
    })
} catch (error) {
    logger.fatal(error);
}
})();
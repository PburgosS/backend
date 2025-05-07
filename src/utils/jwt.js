const jwt = require('jsonwebtoken');
const log4 = require('log4js');
const logger = log4.getLogger('jwt.js');
logger.level = 'all';

const JWT_KEY = process.env.KEY_PRI;

const createAccessToken = (user) => {
    const expiredToken = new Date();
    const payload = {
        token_type : 'access',
        user_id : user._id,
        iat: Date.now(),
        expired : expiredToken.getTime()
    }
    return jwt.sign(payload, JWT_KEY);
}

const createRefreshToken = (user) => {
    const expiredToken = new Date();
    expiredToken.getMonth(expiredToken.getMonth() + 1);

    const payload = {
        token_type: "refresh",
        user_id: user._id,
        iat: Date.now(),
        expired: expiredToken.getTime()
    }

    return jwt.sign(payload, JWT_KEY);
}

const createEncriptedUserViews = (user) => {
    const payload = {
        user_id: user._id,
        userViews: user.userMenu,
    }
    return jwt.sign(payload, JWT_KEY);
}

const decoded = (token) => {
    return jwt.decode(token, JWT_KEY, true);
}

module.exports = {
    createAccessToken,
    createRefreshToken,
    createEncriptedUserViews,
    decoded
}
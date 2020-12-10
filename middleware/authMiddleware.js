const jwt = require('jsonwebtoken');
const { config } = require('../config');
const { ErrorHandler, errors: { UNAUTHORIZED } } = require('../error');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];

        if (!token) {
            throw new ErrorHandler(UNAUTHORIZED.message, UNAUTHORIZED.code);
        }

        req.user = jwt.verify(token, config.JWT_SECRET);
        next();
    } catch (error) {
        next(error);
    }
};

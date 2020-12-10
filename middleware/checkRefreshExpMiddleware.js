const jwt = require('jsonwebtoken');
const { config } = require('../config');
const { ErrorHandler, errors: { UNAUTHORIZED } } = require('../error');

module.exports = (req, res, next) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            throw new ErrorHandler(UNAUTHORIZED.message, UNAUTHORIZED.code);
        }

        req.user = jwt.verify(refreshToken, config.JWT_REFRESH_SECRET);
        next();
    } catch (error) {
        next(error);
    }
};

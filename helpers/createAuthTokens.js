const jwt = require('jsonwebtoken');
const { config } = require('../config');

module.exports = {
    createAccessToken: (userId, email, roles) => jwt.sign(
        { userId, userEmail: email, roles },
        config.JWT_SECRET,
        { expiresIn: config.ACCESS_TOKEN_LIFETIME }
    ),
    createRefreshToken: (userId) => jwt.sign({ userId },
        config.JWT_REFRESH_SECRET,
        { expiresIn: config.REFRESH_TOKEN_LIFETIME })
};

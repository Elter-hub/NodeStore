const jwt = require('jsonwebtoken'),
      {config} = require('../config')

module.exports = {
    createAccessToken:  (userId, email) => {
         return  jwt.sign(
            {userId: userId, userEmail: email},
            config.JWT_SECRET,
            {expiresIn: config.ACCESS_TOKEN_LIFETIME})
    },
    createRefreshToken:  (userId) => {
         return  jwt.sign({userId: userId},
                    config.JWT_REFRESH_SECRET,
            {expiresIn: config.REFRESH_TOKEN_LIFETIME})
    }
}
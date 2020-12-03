const jwt = require('jsonwebtoken'),
      {config} = require('../config')

module.exports = (req, res, next) => {
    try {
        const {refreshToken} = req.body;

        if (!refreshToken) {
            return res.status(401).json({ message: 'Not authorized' })
        }
        console.log('Refresh token from middleware ' + refreshToken);
        req.user = jwt.verify(refreshToken, config.JWT_REFRESH_SECRET)
        next()
    } catch (e) {
        res.status(401).json({ message: 'Not authorized' })
    }
}
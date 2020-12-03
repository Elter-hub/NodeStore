const jwt = require('jsonwebtoken');
const { config } = require('../../config');
const { createAccessToken, createRefreshToken } = require('../../helpers/createAuthTokens');

module.exports = {
    refreshTokens: (req, res) => {
        try {
            let { accessToken } = req.body;
            const { userId, userEmail } = jwt.decode(accessToken, config.JWT_SECRET);

            accessToken = createAccessToken(userId, userEmail);
            const refreshToken = createRefreshToken(userId);

            res.json({ accessToken, refreshToken });
        } catch (error) {
            res.status(400).json({ message: error });
        }
    }
};

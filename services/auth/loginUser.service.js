const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const User = require('../../models/User.model');
const { createAccessToken, createRefreshToken } = require('../../helpers/createAuthTokens');

module.exports = {
    loginUser: async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect credentials'
                });
            }

            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ message: 'Wrong password, please try again' });
            }

            const accessToken = createAccessToken(user.id, email);
            const refreshToken = createRefreshToken(user.id);

            res.json({ accessToken, refreshToken, user });
        } catch (error) {
            res.status(500).json({ message: 'Something went wrong, please try again' });
        }
    }
};

const bcrypt = require('bcrypt');
const User = require('../../models/User.model');
const { createAccessToken, createRefreshToken } = require('../../helpers/createAuthTokens');
const loginValidator = require('../../validators/loginValidator');

module.exports = {
    loginUser: async (req, res) => {
        try {
            const validationResult = loginValidator.validate(req.body);

            if (validationResult.error) {
                throw new Error(validationResult.error.details[0].message);
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

            if (!user.isVerified) {
                res.status(405).json({ message: 'Please confirm your email' });
            }

            const accessToken = createAccessToken(user.id, email);
            const refreshToken = createRefreshToken(user.id);

            res.json({ accessToken, refreshToken, user });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

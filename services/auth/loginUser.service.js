const bcrypt = require('bcrypt');
const User = require('../../models/User.model');
const { createAccessToken, createRefreshToken } = require('../../helpers/createAuthTokens');
const loginValidator = require('../../validators/loginValidator');
const { ErrorHandler, errors: { EMAIL_DOESNT_EXIST, WRONG_PASSWORD, NOT_VERIFIED } } = require('../../error');

module.exports = {
    loginUser: async (req, res, next) => {
        try {
            const validationResult = loginValidator.validate(req.body);

            if (validationResult.error) {
                throw new Error(validationResult.error.details[0].message);
            }

            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                throw new ErrorHandler(EMAIL_DOESNT_EXIST.message, EMAIL_DOESNT_EXIST.code);
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                throw new ErrorHandler(WRONG_PASSWORD.message, WRONG_PASSWORD.code);
            }

            if (!user.isVerified) {
                throw new ErrorHandler(NOT_VERIFIED.message, NOT_VERIFIED.code);
            }

            const accessToken = createAccessToken(user.id, email, user.roles);
            const refreshToken = createRefreshToken(user.id);

            res.json({ accessToken, refreshToken, user });
        } catch (error) {
            next(error);
        }
    }
};

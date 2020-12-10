const jwt = require('jsonwebtoken');
const User = require('../../models/User.model');
const ForgotPasswordToken = require('../../models/ForgotPasswordToken.model');
const sentEmail = require('../../helpers/sendEmail');
const { config } = require('../../config');
const { constants: { CHANGE_PASSWORD } } = require('../../constants');
const { ErrorHandler, errors: { EMAIL_DOESNT_EXIST } } = require('../../error');

module.exports = {
    forgotPassword: async (req, res, next) => {
        try {
            const { email } = req.body;
            const user = await User.findOne({ email });

            if (!user) {
                throw new ErrorHandler(EMAIL_DOESNT_EXIST.message, EMAIL_DOESNT_EXIST.code);
            }

            const token = jwt.sign(
                { userId: user.id },
                config.JWT_FORGOT_PASSWORD_SECRET,
                { expiresIn: config.JWT_FORGOT_PASSWORD_LIFETIME }
            );

            const forgotPasswordToken = new ForgotPasswordToken({ userId: user.id, token });
            await forgotPasswordToken.save();

            // TODO enable sending email
            // await sentEmail(user, [
            //     email,
            //     token
            // ], 'Reset your password', 'forgotPassword');
            // Fucking linter not allowing ternary
            if (user) res.json({ message: CHANGE_PASSWORD });
        } catch (error) {
            next(error);
        }
    }
};

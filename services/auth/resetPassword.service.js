const bcrypt = require('bcrypt');
const User = require('../../models/User.model');
const ForgotPasswordToken = require('../../models/ForgotPasswordToken.model');
const resetPasswordValidator = require('../../validators/resetPasswordValidator');
const { ErrorHandler, errors: { SERVER_ERROR, PASSWORD_IS_TO_WEAK } } = require('../../error');
const { constants: { CHANGE_PASSWORD_SUCCESS } } = require('../../constants');

module.exports = {
    resetPassword: async (req, res, next) => {
        try {
            const validationResult = resetPasswordValidator.validate(req.body);

            if (validationResult.error) {
                throw new ErrorHandler(PASSWORD_IS_TO_WEAK.message, PASSWORD_IS_TO_WEAK.code);
            }

            const { email, newPassword, token } = req.body;

            const user = await User.findOne({ email });
            const forgotPasswordToken = await ForgotPasswordToken.findOne({ token });

            if (user && forgotPasswordToken) {
                user.password = await bcrypt.hash(newPassword, 12);
                await user.save();

                res.json({ message: CHANGE_PASSWORD_SUCCESS });
            } else {
                throw new ErrorHandler(SERVER_ERROR.message, SERVER_ERROR.code);
            }
        } catch (error) {
            next(error);
        }
    }
};

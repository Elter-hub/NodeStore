const jwt = require('jsonwebtoken');
const User = require('../../models/User.model');
const ForgotPasswordToken = require('../../models/ForgotPasswordToken.model');
const sentEmail = require('../../helpers/sendEmailSignupConfirmation');
const { config } = require('../../config');

module.exports = {
    forgotPassword: async (req, res) => {
        try {
            const { email } = req.body;
            const user = await User.findOne({ email });

            const token = jwt.sign(
                { userId: user.id },
                config.JWT_FORGOT_PASSWORD_SECRET,
                { expiresIn: config.JWT_FORGOT_PASSWORD_LIFETIME }
            );

            const forgotPasswordToken = new ForgotPasswordToken({ userId: user.id, token });
            await forgotPasswordToken.save();

            await sentEmail(user, [
                email,
                token
            ], 'Reset your password', 'forgotPassword');
            // Fucking linter not allowing ternary
            if (user) res.status(200).json({ message: 'You can change password by filling next form' });
            else res.status(404).json({ message: 'Email doesnt exist' });
        } catch (error) {
            res.status(400).json({
                message: error
            });
        }
    }
};

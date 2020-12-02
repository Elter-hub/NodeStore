const User = require('../../models/User.model')
const ForgotPasswordToken = require('../../models/ForgotPasswordToken.model')
const sentEmail = require('../../helpers/sendEmailSignupConfirmation')
const {config} = require('../../config')
const jwt = require('jsonwebtoken');

module.exports = {
    forgotPassword: async (req, res) => {
        try {
            const {email} = req.body;
            const user = await User.findOne({email})

            user ? res.status(200).json({message: 'You can change password by filling next form'})
                 : res.status(404).json({message: 'Email doesnt exist'})

            const token = jwt.sign(
                {userId: user.id},
                config.JWT_FORGOT_PASSWORD_SECRET,
                {expiresIn: config.JWT_FORGOT_PASSWORD_LIFETIME});

            const forgotPasswordToken = await new ForgotPasswordToken({_userId: user.id, token})
            await forgotPasswordToken.save();
            await sentEmail(user, [email, token], 'Reset your password', 'forgotPassword')

        }catch (e){
            console.log(e)
            res.status(400).json({
                message: e
            })
        }
    }
}
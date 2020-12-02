const User = require('../../models/User.model')
const ForgotPasswordToken = require('../../models/ForgotPasswordToken.model')
const bcrypt = require('bcrypt');

module.exports = {
    resetPassword: async (req, res) => {
        try {
            const {email, newPassword, token} = req.body

            const user = await User.findOne({email})
            const forgotPasswordToken = await ForgotPasswordToken.findOne({token})

            if (user && forgotPasswordToken) {
                user.password = await bcrypt.hash(newPassword, 12);
                await user.save();
                res.json({
                    message: 'Your password is successively changed! '
                })
            } else {
                res.status(400).json({message: 'Something wrong'});
            }
        } catch (error) {
            res.status(400).json({
                message: error
            })
        }
    }
}
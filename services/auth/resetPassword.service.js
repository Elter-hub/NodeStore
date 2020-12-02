const User = require('../../models/User.model')
const ForgotPasswordToken = require('../../models/ForgotPasswordToken.model')
const {config} = require('../../config')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


module.exports = {
    resetPassword: async (req, res) => {
        try {
        const {email, newPassword, token} = req.body

            const user = await User.findOne({email})
            console.log('user ' + user)
            const forgotPasswordToken = await ForgotPasswordToken.findOne({token})
            console.log('forgotPasswordToken ' + forgotPasswordToken)

            if (user && forgotPasswordToken) {
                user.password = await bcrypt.hash(newPassword, 12);
                await user.save();
                res.json({
                    message: 'Your password is successively changed! '
                })
            }else {
                res.status(400).json({message: 'Something wrong'});
            }
        }catch (e){
            console.log(e)
            res.status(400).json({
                message: e
            })
        }
    }
}
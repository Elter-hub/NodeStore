const EmailConfirmation = require('../../models/EmailConfirmation.model')
const User = require('../../models/User.model')

module.exports = {
    confirmEmail: async (req, res) => {
        try {
            const {emailConfirmationToken} = req.body
            const token = await EmailConfirmation.findOne({token: emailConfirmationToken})
            await User.findOneAndUpdate({_id: token._userId},
                {
                    "$set": {
                        "isVerified": true
                    }
                })
        } catch (e) {
            res.status(400).json({
                message: "Something went wrong..."
            })
        }
    }
}
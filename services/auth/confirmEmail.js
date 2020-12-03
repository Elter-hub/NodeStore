const EmailConfirmation = require('../../models/EmailConfirmationToken.model'),
    User = require('../../models/User.model')

module.exports = {
    confirmEmail: async (req, res) => {
        try {
            const {emailConfirmationToken} = req.body
            //2 queries not good... cause they are related through ref!
            //Cant do it with 1 query, tried EmailConfirmation.findOne.populate(userId).exec{change is verified}
            // -> but changes not save
            const token = await EmailConfirmation.findOne({token: emailConfirmationToken})
            await User.findOneAndUpdate({_id: token._userId},
                {
                    "$set": {
                        "isVerified": true
                    }
                })
        } catch (error) {
            res.status(400).json({
                message: "Something went wrong..."
            })
        }
    }
}
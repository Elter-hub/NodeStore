const EmailConfirmation = require('../../models/EmailConfirmationToken.model');
const User = require('../../models/User.model');

module.exports = {
    confirmEmail: async (req, res) => {
        try {
            const { emailConfirmationToken } = req.body;
            // 2 queries not good... cause Objects are related through ref!
            // Cant do it with 1 query, tried EmailConfirmation.findOne.populate(userId).exec{change is verified}
            // -> but changes are not saving
            const token = await EmailConfirmation.findOne({ token: emailConfirmationToken });
            // That's ⤵⤵⤵⤵⤵⤵⤵  default wtf?????
            // eslint-disable-next-line no-underscore-dangle
            await User.findOneAndUpdate({ _id: token.userId },
                {
                    $set: {
                        isVerified: true
                    }
                });
        } catch (error) {
            res.status(400).json({
                message: 'Something went wrong...'
            });
        }
    }
};

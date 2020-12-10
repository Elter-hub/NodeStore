const EmailConfirmation = require('../../models/EmailConfirmationToken.model');
const User = require('../../models/User.model');
const { constants: { ACCEPTED, ACCOUNT_VERIFIED } } = require('../../constants');

module.exports = {
    confirmEmail: async (req, res, next) => {
        try {
            const { emailConfirmationToken } = req.body;
            const token = await EmailConfirmation.findOne({ token: emailConfirmationToken });
            // eslint-disable-next-line no-underscore-dangle
            await User.findOneAndUpdate({ _id: token.userId },
                {
                    $set: {
                        isVerified: true
                    }
                });

            res.status(ACCEPTED).json({ message: ACCOUNT_VERIFIED });
        } catch (error) {
            next(error);
        }
    }
};

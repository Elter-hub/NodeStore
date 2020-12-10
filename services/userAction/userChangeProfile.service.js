const bcrypt = require('bcrypt');
const User = require('../../models/User.model');
const urlValidator = require('../../validators/urlValidator');
const { ErrorHandler, errors: { PASSWORD_MISMATCH } } = require('../../error');
const { constants: { CHANGE_PASSWORD_SUCCESS, ACCEPTED, IMAGE_CHANGED } } = require('../../constants');

module.exports = {
    userChangePassword: async (req, res, next) => {
        try {
            const { email, oldPassword, newPassword } = req.body;
            const user = await User.findOne({ email });
            const isMatch = await bcrypt.compare(oldPassword, user.password);

            if (!isMatch) {
                throw new ErrorHandler(PASSWORD_MISMATCH.message, PASSWORD_MISMATCH.code);
            }

            user.password = await bcrypt.hash(newPassword, 12);
            await user.save();

            res.status(ACCEPTED).json({ message: CHANGE_PASSWORD_SUCCESS });
        } catch (error) {
            next(error);
        }
    },
    changeImageUrl: async (req, res, next) => {
        try {
            const { email, newImageUrl } = req.body;
            const isUrlValid = urlValidator.validate(newImageUrl);

            if (isUrlValid.error) {
                throw new Error(isUrlValid.error.details[0].message);
            }

            const user = await User.findOne({ email });
            user.imageUrl = newImageUrl;

            await user.save();

            res.status(ACCEPTED).json({ message: IMAGE_CHANGED });
        } catch (error) {
            next(error);
        }
    }
};

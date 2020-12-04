const bcrypt = require('bcrypt');
const User = require('../../models/User.model');
const urlValidator = require('../../helpers/urlValidator');

module.exports = {
    userChangePassword: async (req, res) => {
        try {
            const { email, oldPassword, newPassword } = req.body;
            const user = await User.findOne({ email });
            const isMatch = await bcrypt.compare(oldPassword, user.password);

            if (!isMatch) {
                return res.status(400).json({ message: 'Old password is incorrect' });
            }

            user.password = await bcrypt.hash(newPassword, 12);
            await user.save();

            res.status(202).json({ message: 'Password successfully changed!' });
        } catch (e) {
            res.status(500).json({ message: 'Something went wrong, please try again' });
        }
    },
    changeImageUrl: async (req, res) => {
        try {
            const { email, newImageUrl } = req.body;
            const isUrlValid = urlValidator.validate(newImageUrl);

            if (isUrlValid.error) {
                throw new Error(isUrlValid.error.details[0].message);
            }

            const user = await User.findOne({ email });
            user.imageUrl = newImageUrl;

            await user.save();

            res.status(202).json({ message: 'Image successfully changed!' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Something went wrong, please try again' });
        }
    }
};

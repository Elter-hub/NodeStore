const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../../models/User.model');
const { Cart } = require('../../models/Cart.model');
const EmailConfirmationToken = require('../../models/EmailConfirmationToken.model');
const sentEmail = require('../../helpers/sendEmail');
const { config } = require('../../config');
const userValidator = require('../../validators/userValidator');
const {
    constants: {
        CREATED, USER_CREATED, CONFLICT, USER_EXIST
    }
} = require('../../constants');

module.exports = {
    createNewUser: async (req, res, next) => {
        try {
            const isUserValid = userValidator.validate(req.body);

            if (isUserValid.error) {
                throw new Error(isUserValid.error.details[0].message);
            }

            const { username, email, password } = req.body;
            const candidate = await User.findOne({ email });

            if (candidate) {
                return res.status(CONFLICT).json({ message: USER_EXIST });
            }
            const hashedPassword = await bcrypt.hash(password, 12);
            const user = new User({
                username, email, password: hashedPassword
            });

            // eslint-disable-next-line no-underscore-dangle
            const token = jwt.sign(
                { userId: user.id },
                config.JWT_CONFIRM_EMAIL_SECRET,
                { expiresIn: config.JWT_CONFIRM_EMAIL_LIFETIME }
            );

            const emailConfirmationToken = new EmailConfirmationToken({ userId: user.id, token });
            await emailConfirmationToken.save();
            // eslint-disable-next-line no-underscore-dangle
            user.cart = new Cart({ userId: user._id });

            await sentEmail(user, { token }, 'Please confirm your registration!', 'emailConfirm');
            await user.save();

            res.status(CREATED).json({ message: USER_CREATED });
        } catch (error) {
            next(error);
        }
    }
};

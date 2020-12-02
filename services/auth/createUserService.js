const {validationResult} = require('express-validator')
const User = require('../../models/User.model')
const EmailConfirmationToken = require('../../models/EmailConfirmationToken.model')
const bcrypt = require("bcrypt");
const sentEmail = require('../../helpers/sendEmailSignupConfirmation')
const jwt = require('jsonwebtoken');
const {config} = require('../../config')

module.exports = {
    createNewUser: async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Invalid credentials'
                })
            }

            const {email, password} = req.body

            const candidate = await User.findOne({ email })

            if (candidate) {
                return res.status(409).json({ message: 'User with provided email already exist!' })
            }

            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({ email, password: hashedPassword })

            const token = jwt.sign(
                {userId: user.id},
                config.JWT_CONFIRM_EMAIL_SECRET,
                {expiresIn: config.JWT_CONFIRM_EMAIL_LIFETIME});

            const emailConfirmationToken = new EmailConfirmationToken({_userId: user.id, token})
            await emailConfirmationToken.save();

            await sentEmail(user, {token}, 'Please confirm your registration!', 'emailConfirm')
            await user.save()

            res.status(201).json({ message: 'User created' })

        } catch (e) {
            res.status(500).json({ message: 'Something went wrong, please try again' })
        }
    }
}
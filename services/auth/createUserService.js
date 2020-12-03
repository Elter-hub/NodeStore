const {validationResult} = require('express-validator'),
    User = require('../../models/User.model'),
    EmailConfirmationToken = require('../../models/EmailConfirmationToken.model'),
    bcrypt = require("bcrypt"),
    sentEmail = require('../../helpers/sendEmailSignupConfirmation'),
    jwt = require('jsonwebtoken'),
    {config} = require('../../config')

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
            const candidate = await User.findOne({email})

            if (candidate) {
                return res.status(409).json({message: 'User with provided email already exist!'})
            }

            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({email, password: hashedPassword})

            const token = jwt.sign(
                {userId: user.id},
                config.JWT_CONFIRM_EMAIL_SECRET,
                {expiresIn: config.JWT_CONFIRM_EMAIL_LIFETIME});

            const emailConfirmationToken = new EmailConfirmationToken({_userId: user.id, token})
            await emailConfirmationToken.save();

            await sentEmail(user, {token}, 'Please confirm your registration!', 'emailConfirm')
            await user.save()

            res.status(201).json({message: 'User created'})

        } catch (error) {
            res.status(500).json({message: 'Something went wrong, please try again'})
        }
    }
}
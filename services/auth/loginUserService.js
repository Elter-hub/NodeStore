const {validationResult} = require('express-validator')
const User = require('../../models/User.model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {config} = require('../../config')

module.exports = {
    loginUser: async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect credentials'
                })
            }

            const {email, password} = req.body
            const user = await User.findOne({email})
            if (!user) {
                return res.status(404).json({message: 'User not found'})
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).json({message: 'Wrong password, please try again'})
            }

            const accessToken = jwt.sign(
                {userId: user.id, userEmail: email},
                config.JWT_SECRET,
                {expiresIn: config.ACCESS_TOKEN_LIFETIME}
            )

            const refreshToken = jwt.sign(
                {userId: user.id},
                config.JWT_REFRESH_SECRET,
                {expiresIn: config.REFRESH_TOKEN_LIFETIME}
            )

            res.json({accessToken, refreshToken: refreshToken, userId: user.id})

        } catch (e) {
            res.status(500).json({message: 'Something went wrong, please try again'})
        }
    }
}
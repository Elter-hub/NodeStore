const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
    console.log(req.headers)
    try {
        const token = req.headers.authorization.split(' ')[1]

        if (!token) {
            return res.status(401).json({ message: 'Нет авторизации' })
        }

        req.user = jwt.verify(token, config.get('jwtSecret'))
        next()
    } catch (e) {
        res.status(401).json({ message: 'Нет авторизации' })
    }
}
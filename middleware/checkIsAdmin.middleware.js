const jwt = require('jsonwebtoken');
const { config } = require('../config');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Not authorized' });
        }
        jwt.verify(token, config.JWT_SECRET);

        const user = jwt.decode(token, config.JWT_SECRET);
        const isAdmin = user.roles.includes('ROLE_ADMIN');

        if (isAdmin) {
            next();
        } else {
            res.status(403).json({ message: 'Not authorized' });
        }
    } catch (e) {
        res.status(403).json({ message: 'Not authorized' });
    }
};

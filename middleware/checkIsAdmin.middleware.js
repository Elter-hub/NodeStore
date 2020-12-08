const jwt = require('jsonwebtoken');
const { config } = require('../config');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Not authorized' });
        }
        const verify = jwt.verify(token, config.JWT_SECRET);
        const user = jwt.decode(token, config.JWT_SECRET);

        if (user.roles.includes('ROLE_ADMIN')) {
            next();
        } else {
            res.status(403).json({ message: 'Not authorized' });
        }
    } catch (e) {
        res.status(403).json({ message: 'Not authorized authorized' });
    }
};

const { Router } = require('express');
const {
    createUser, login, confirmEmail, forgotPassword, resetPassword, refreshTokens
} = require('../contoller/authUser.controller');
const checkRefreshExpMiddleware = require('../middleware/checkRefreshExpMiddleware');

const router = Router();

router.post('/signup', createUser);
router.post('/login', login);
router.post('/confirm', confirmEmail);
router.post('/forgotPassword', forgotPassword);
router.post('/resetPassword', resetPassword);
router.post('/refreshTokens', checkRefreshExpMiddleware, refreshTokens);

module.exports = router;

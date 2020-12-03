const { Router } = require('express');
const { check } = require('express-validator');
const authController = require('../contoller/auth/authUserController');
const checkRefreshExpMiddleware = require('../middleware/checkRefreshExpMiddleware');

const router = Router();

router.post(
    '/signup',
    [
        check('email', 'Invalid email').isEmail(),
        check('password', 'Min password length is 6 symbols')
            .isLength({ min: 6 })
    ],
    authController.createUser
);

router.post(
    '/login',
    [
        check('email', 'Enter correct email').normalizeEmail().isEmail(),
        check('password', 'Enter password').exists()
    ],
    authController.login
);

router.post('/confirm', authController.confirmEmail);

router.post('/forgotPassword', authController.forgotPassword);

router.post('/resetPassword', authController.resetPassword);

router.post('/refreshTokens', checkRefreshExpMiddleware, authController.refreshTokens);

module.exports = router;

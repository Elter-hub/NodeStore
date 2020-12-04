const { Router } = require('express');
const authController = require('../contoller/auth/authUserController');
const checkRefreshExpMiddleware = require('../middleware/checkRefreshExpMiddleware');

const router = Router();

router.post(
    '/signup',
    authController.createUser
);

router.post(
    '/login',
    authController.login
);

router.post('/confirm', authController.confirmEmail);

router.post('/forgotPassword', authController.forgotPassword);

router.post('/resetPassword', authController.resetPassword);

router.post('/refreshTokens', checkRefreshExpMiddleware, authController.refreshTokens);

module.exports = router;

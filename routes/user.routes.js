const router = require('express').Router(),
    authMiddleware = require('../middleware/authMiddleware'),
    authController = require('../contoller/auth/authUserController')


router.patch('/changePassword', authMiddleware, authController.changePassword)
router.patch('/changeImage', authMiddleware, authController.changeImage)

module.exports = router
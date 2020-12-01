const router = require('express').Router();
const authMiddleware = require('../middleware/authMiddleware')
const authController = require('../contoller/auth/authUserController')


router.patch('/changePassword', authMiddleware, authController.changePassword)
router.patch('/changeImage', authMiddleware, authController.changeImage)

module.exports = router
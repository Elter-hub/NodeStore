const router = require('express').Router();
const authMiddleware = require('../middleware/authMiddleware');
const authController = require('../contoller/auth/authUserController');
const { addToCart, removeFromCart, buyProducts } = require('../contoller/content.controller');

router.patch('/changePassword', authMiddleware, authController.changePassword);
router.patch('/changeImage', authMiddleware, authController.changeImage);
router.patch('/addToCart', authMiddleware, addToCart);
router.patch('/removeFromCart', authMiddleware, removeFromCart);
router.post('/buyProducts', authMiddleware, buyProducts);

module.exports = router;

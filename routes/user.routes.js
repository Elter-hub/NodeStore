const router = require('express').Router();
const authMiddleware = require('../middleware/authMiddleware');
const { changePassword, changeImage } = require('../contoller/auth/authUserController');
const { addToCart, removeFromCart, buyProducts } = require('../contoller/content.controller');

router.patch('/changePassword', authMiddleware, changePassword);
router.patch('/changeImage', authMiddleware, changeImage);
router.patch('/addToCart', authMiddleware, addToCart);
router.patch('/removeFromCart', authMiddleware, removeFromCart);
router.post('/buyProducts', authMiddleware, buyProducts);

module.exports = router;

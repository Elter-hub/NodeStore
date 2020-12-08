const router = require('express').Router();
const authMiddleware = require('../middleware/authMiddleware');
const { changePassword, changeImage } = require('../contoller/auth/authUserController');
const { addToCart, removeFromCart, buyProducts } = require('../contoller/content.controller');

router.use('/', authMiddleware);
router.patch('/changePassword', changePassword);
router.patch('/changeImage', changeImage);
router.patch('/addToCart', addToCart);
router.patch('/removeFromCart', removeFromCart);
router.post('/buyProducts', buyProducts);

module.exports = router;

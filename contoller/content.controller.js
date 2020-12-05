const { allProducts: { allProducts }, addToCart: { addToCart }, removeFromCart } = require('../services/content');
const buyProducts = require('../services/payment/buyProducts.service');

module.exports = {
    showAllProducts: (req, res) => allProducts(req, res),
    addToCart: (req, res) => addToCart(req, res),
    removeFromCart: (req, res) => removeFromCart(req, res),
    buyProducts: (req, res) => buyProducts(req, res)
};

const { allProducts: { allProducts }, addToCart: { addToCart }, removeFromCart } = require('../services/content');

module.exports = {
    showAllProducts: (req, res) => allProducts(req, res),
    addToCart: (req, res) => addToCart(req, res),
    removeFromCart: (req, res) => removeFromCart(req, res)
};

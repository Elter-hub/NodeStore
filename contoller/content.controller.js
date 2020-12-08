const {
    allProducts: { allProducts }, addToCart: { addToCart }, removeFromCart, addNewProduct, promoteProduct,
    cancelPromotion, addQuantity, deleteProduct
} = require('../services/content');
const buyProducts = require('../services/payment/buyProducts.service');
const { analyticForSpecificProduct, getAllLabels, analyticForAllProducts } = require('../services/analytic/analytic.service');

module.exports = {
    showAllProducts: (req, res) => allProducts(req, res),
    addToCart: (req, res) => addToCart(req, res),
    removeFromCart: (req, res) => removeFromCart(req, res),
    buyProducts: (req, res) => buyProducts(req, res),
    addNewProduct: (req, res) => addNewProduct(req, res),
    promoteProduct: (req, res) => promoteProduct(req, res),
    cancelPromotion: (req, res) => cancelPromotion(req, res),
    addQuantity: (req, res) => addQuantity(req, res),
    deleteProduct: (req, res) => deleteProduct(req, res),
    analyticForSpecificProduct: (req, res) => analyticForSpecificProduct(req, res),
    getAllLabels: (req, res) => getAllLabels(req, res),
    analyticForAllProducts: (req, res) => analyticForAllProducts(req, res),
};

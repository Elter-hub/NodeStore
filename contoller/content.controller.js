const {
    allProducts: { allProducts }, addToCart: { addToCart }, removeFromCart, addNewProduct, promoteProduct,
    cancelPromotion, addQuantity, deleteProduct
} = require('../services/content');
const buyProducts = require('../services/payment/buyProducts.service');
const { analyticForSpecificProduct, getAllLabels, analyticForAllProducts } = require('../services/analytic/analytic.service');

module.exports = {
    showAllProducts: (req, res, next) => allProducts(req, res, next),
    addToCart: (req, res, next) => addToCart(req, res, next),
    removeFromCart: (req, res, next) => removeFromCart(req, res, next),
    buyProducts: (req, res, next) => buyProducts(req, res, next),
    addNewProduct: (req, res, next) => addNewProduct(req, res, next),
    promoteProduct: (req, res, next) => promoteProduct(req, res, next),
    cancelPromotion: (req, res, next) => cancelPromotion(req, res, next),
    addQuantity: (req, res, next) => addQuantity(req, res, next),
    deleteProduct: (req, res, next) => deleteProduct(req, res, next),
    analyticForSpecificProduct: (req, res, next) => analyticForSpecificProduct(req, res, next),
    getAllLabels: (req, res, next) => getAllLabels(req, res, next),
    analyticForAllProducts: (req, res, next) => analyticForAllProducts(req, res, next),
};

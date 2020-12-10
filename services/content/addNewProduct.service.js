const Product = require('../../models/Product.model');
const { constants: { NEW_PRODUCT_ADDED, CREATED } } = require('../../constants');

module.exports = async (req, res, next) => {
    try {
        const product = new Product(req.body);
        await product.save();

        res.status(CREATED).json({ message: NEW_PRODUCT_ADDED });
    } catch (error) {
        next(error);
    }
};

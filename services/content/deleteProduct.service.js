const Product = require('../../models/Product.model');
const { constants: { NO_CONTENT, PRODUCT_DELETED } } = require('../../constants');

module.exports = async (req, res, next) => {
    try {
        const { productId } = req.query;
        await Product.findByIdAndDelete(productId);

        res.status(NO_CONTENT).json({ message: PRODUCT_DELETED });
    } catch (error) {
        next(error);
    }
};

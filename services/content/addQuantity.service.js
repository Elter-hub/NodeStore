const Product = require('../../models/Product.model');

module.exports = async (req, res, next) => {
    try {
        const { product, quantity } = req.body;
        const prod = await Product.findById(product._id);
        prod.totalQuantity += +quantity;
        prod.save();

        res.json(prod);
    } catch (error) {
        next(error);
    }
};

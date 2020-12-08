const { ProductModel } = require('../../models/Product.model');

module.exports = async (req, res) => {
    try {
        const { product, quantity } = req.body;
        // eslint-disable-next-line no-underscore-dangle
        const prod = await ProductModel.findById(product._id);
        prod.totalQuantity += +quantity;
        prod.save();
        res.json(prod);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

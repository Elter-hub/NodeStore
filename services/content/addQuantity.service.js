const Product = require('../../models/Product.model');

module.exports = async (req, res) => {
    try {
        const { product, quantity } = req.body;
        const prod = await Product.findById(product._id);
        prod.totalQuantity += +quantity;
        prod.save();

        res.json(prod);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

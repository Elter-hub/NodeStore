const { ProductModel } = require('../../models/Product.model');

module.exports = async (req, res) => {
    try {
        const product = new ProductModel(req.body);
        await product.save();
        res.status(201).json({ message: 'Product created' });
    } catch (error) {
        res.json({ message: error.message });
    }
};

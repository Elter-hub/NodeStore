const Product = require('../../models/Product.model');

module.exports = async (req, res) => {
    try {
        const { productId } = req.query;
        await Product.findByIdAndDelete(productId);

        res.status(204).json({ message: 'Product was deleted' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

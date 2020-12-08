const Product = require('../../models/Product.model');

module.exports = async (req, res) => {
    try {
        const { product } = req.body;
        const prod = await Product.findByIdAndUpdate(product._id, {
            $set: {
                promotedPrice: 0,
                discount: 0
            }
        }, { new: true });

        res.json(prod);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

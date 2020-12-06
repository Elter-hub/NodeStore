const { ProductModel } = require('../../models/Product.model');

module.exports = async (req, res) => {
    try {
        const { product } = req.body;
        // eslint-disable-next-line no-underscore-dangle
        const prod = await ProductModel.findByIdAndUpdate(product._id, {
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

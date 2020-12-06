const { ProductModel } = require('../../models/Product.model');

module.exports = async (req, res) => {
    try {
        const { _id, price, newPrice } = req.body;
        const product = await ProductModel.findByIdAndUpdate(_id, {
            $set: {
                promotedPrice: newPrice,
                discount: ((1 - (newPrice / price)) * 100).toFixed(0)
            }
        }, { new: true });
        res.json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

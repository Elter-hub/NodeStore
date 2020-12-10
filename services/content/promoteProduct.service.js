const Product = require('../../models/Product.model');

module.exports = async (req, res, next) => {
    try {
        const { _id, price, newPrice } = req.body;
        const product = await Product.findByIdAndUpdate(_id, {
            $set: {
                promotedPrice: newPrice,
                discount: ((1 - (newPrice / price)) * 100).toFixed(0)
            }
        }, { new: true });

        res.json(product);
    } catch (error) {
        next(error);
    }
};

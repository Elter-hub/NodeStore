const Product = require('../../models/Product.model');

module.exports = async (req, res, next) => {
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
        next(error);
    }
};

const User = require('../../models/User.model');

module.exports = async (req, res, next) => {
    try {
        const { email, product } = req.body;
        const user = await User.findOne({ email });

        user.cart.products = user.cart.products
            .filter((prod) => prod.productId.toString() !== product.productId.toString());
        user.save();

        res.json(user.cart.products);
    } catch (error) {
        next(error);
    }
};

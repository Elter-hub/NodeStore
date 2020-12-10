const User = require('../../models/User.model');

module.exports = {
    addToCart: async (req, res, next) => {
        try {
            const { email, product } = req.body;

            const user = await User.findOne({ email });
            const isInCart = user.cart.products.find((prod) => prod.productId.toString() === product.productId.toString());

            if (isInCart) {
                isInCart.count++;
            } else {
                user.cart.products.push(product);
            }
            user.save();

            res.json(user.cart);
        } catch (error) {
            next(error);
        }
    }
};

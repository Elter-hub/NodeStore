const User = require('../../models/User.model');

module.exports = async (req, res) => {
    try {
        console.log(req.body);
        const { email, product } = req.body;
        const user = await User.findOne({ email });

        user.cart.products = user.cart.products.filter((prod) => {
            console.log(prod.productId.toString());
            console.log(product.productId.toString());
            console.log(prod.productId.toString() !== product.productId.toString());
            return prod.productId.toString() !== product.productId.toString();
        });
        user.save();
        res.json(user.cart.products);
    } catch (error) {
        console.log(error);
        res.json({ message: error.message });
    }
};

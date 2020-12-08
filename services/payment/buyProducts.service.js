const { config: { STRIPE_SECRET_KEY } } = require('../../config');
const User = require('../../models/User.model');
const Order = require('../../models/Order.model');
const stripe = require('stripe')(STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
    try {
        const {
            email, token, sum, products
        } = req.body;
        console.log(products, 'buyProducts');
        const order = new Order();
        products.forEach((prod) => {
            order.orders.push({ label: prod.label, price: prod.price, count: prod.count });
        });
        await order.save();
        const customer = await stripe.customers.create({
            email,
            source: token,
            name: 'Ihor D',
        });
        await stripe.charges.create({
            amount: sum * 100,
            description: 'Learning Node js',
            currency: 'UAH',
            customer: customer.id
        });
        const user = await User.findOne({ email });
        user.cart.products = [];
        user.save();
        res.json({ message: 'Success' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

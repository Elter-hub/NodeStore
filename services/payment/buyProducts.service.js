const { config: { STRIPE_SECRET_KEY } } = require('../../config');
const User = require('../../models/User.model');
// eslint-disable-next-line import/order
const stripe = require('stripe')(STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
    try {
        const {
            email, token, sum, userId
        } = req.body;
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
        console.log(error);
        res.status(400).json({ message: error });
    }
};

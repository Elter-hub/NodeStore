const Order = require('../../models/Order.model');
const { ProductModel } = require('../../models/Product.model');

module.exports = {
    analyticForSpecificProduct: async (req, res) => {
        try {
            const { label } = req.query;
            const allOrders = await Order.find({ orders: { $elemMatch: { label } } });
            const productAnalytic = [];

            allOrders.forEach((fullOrders) => {
                const { date } = fullOrders;
                const prodAnalytic = {};

                prodAnalytic.date = date;
                prodAnalytic.label = label;

                fullOrders.orders.filter((product) => product.label === label)
                    .forEach((prod) => {
                        prodAnalytic.count = prod.count;
                    });

                productAnalytic.push(prodAnalytic);
            });
            let result = [];
            productAnalytic.reduce((accumulate, value) => {
                if (!accumulate[value.date]) {
                    accumulate[value.date] = { date: value.date, count: 0 };
                    result.push(accumulate[value.date]);
                }

                accumulate[value.date].count += value.count;
                return accumulate;
            }, {});
            result = result.sort((prod1, prod2) => (prod1.date > prod2.date ? 1 : -1));
            res.json(result);
        } catch (e) {
            res.json({ message: e.message });
        }
    },
    getAllLabels: async (req, res) => {
        try {
            const allProducts = await ProductModel.find().select('label');
            res.json(allProducts);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    analyticForAllProducts: async (req, res) => {
        try {
            const allOrders = await Order.find().select('orders');
            const productAnalytic = [];
            allOrders.forEach((order) => order.orders.reduce((accum, prod) => {
                if (!accum[prod.label]) {
                    accum[prod.label] = { label: prod.label, sum: 0 };
                    productAnalytic.push(accum[prod.label]);
                }
                accum[prod.label].sum += prod.price * prod.count;
                return accum;
            }));
            console.log(productAnalytic);
            const result = productAnalytic.reduce((accum, prod) => {
                accum[prod.label] = 0;
                accum[prod.label] += prod.sum;
                return accum;
            }, {});
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(400).json({ message: error.message });
        }
    }
};

const Product = require('../../models/Product.model');

module.exports = {
    allProducts: async (req, res) => {
        try {
            const allProducts = await Product.find();

            res.json(allProducts.map((prod) => prod.toObject({ versionKey: false })));
        } catch (error) {
            res.json({ message: error.message });
        }
    }
};

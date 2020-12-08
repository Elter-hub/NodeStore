const { ProductModel } = require('../../models/Product.model');

module.exports = {
    allProducts: async (req, res) => {
        try {
            const allProducts = await ProductModel.find();
            return res.json(allProducts.map((prod) => prod.toObject({ versionKey: false })));
        } catch (error) {
            res.json({ message: error.message });
        }
    }
};

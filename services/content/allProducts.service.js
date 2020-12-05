const { productModel } = require('../../models/Product.model');

module.exports = {
    allProducts: async (req, res) => {
        try {
            const allProducts = await productModel.find();
            return res.json(allProducts.map((prod) => prod.toObject({ versionKey: false })));
        } catch (error) {
            res.json({ message: error.message });
            console.log(error);
        }
    }
};

const { Schema, model } = require('mongoose');

const productSchema = new Schema({
    label: { type: String, required: true },
    description: { type: String, required: true },
    discount: { type: Number, default: 0 },
    productImageUrl: { type: String, required: true },
    price: { type: Number, required: true },
    promotedPrice: { type: Number },
    totalQuantity: { type: Number, required: true },
});

module.exports = {
    ProductModel: model('Product', productSchema),
    productSchema
};

const { Types, Schema, model } = require('mongoose');

const productSubModel = {
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    count: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
    }
};

const cartSchema = new Schema({
    userId: { type: Types.ObjectId, required: true, ref: 'User' },
    products: [productSubModel],
    sum: { type: Number, default: 0 }
});

module.exports = {
    Cart: model('Cart', cartSchema),
    cartSchema
};

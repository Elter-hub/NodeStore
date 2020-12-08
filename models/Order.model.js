const { Schema, model } = require('mongoose');

const subOrder = {
    label: { type: String, required: true },
    price: { type: Number, required: true },
    count: { type: Number, required: true },
};

const orderSchema = new Schema({
    orders: [subOrder],
    date: { type: Date, default: Date.now }
});

module.exports = model('Order', orderSchema);

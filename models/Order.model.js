const { Schema, model } = require('mongoose');

const subOrder = {
    label: { type: String, required: true },
    price: { type: Number, required: true },
    count: { type: Number, required: true },
};

const orderSchema = new Schema({
    orders: [subOrder],
    date: { type: Date, default: new Date('December 9, 2020') }
});

module.exports = model('Order', orderSchema);

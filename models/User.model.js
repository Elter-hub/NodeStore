const { Schema, model } = require('mongoose');
const { constants } = require('../constants');
const { cartSchema } = require('./Cart.model');

const userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    roles: { type: [String], default: ['ROLE_USER'] },
    imageUrl: { type: String, default: constants.DEFAULT_USER_IMAGE_URL },
    // TODO default false!!!!
    isVerified: { type: Boolean, default: true },
    cart: cartSchema
});

module.exports = model('User', userSchema);

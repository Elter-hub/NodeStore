const {Schema, model, Types} = require('mongoose')

const forgotPasswordTokenSchema = new Schema({
    _userId: { type: Types.ObjectId, required: true, ref: 'User' },
    token: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now }
});

module.exports = model('ForgotPasswordToken', forgotPasswordTokenSchema)
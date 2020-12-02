const {Schema, model, Types} = require('mongoose')

const emailTokenSchema = new Schema({
    _userId: { type: Types.ObjectId, required: true, ref: 'User' },
    token: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now, expires: 86400 }
});

module.exports = model('EmailConfirmationToken', emailTokenSchema)
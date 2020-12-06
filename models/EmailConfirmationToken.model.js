const { Schema, model, Types } = require('mongoose');

const emailTokenSchema = new Schema({
    userId: { type: Types.ObjectId, required: true, ref: 'User' },
    token: { type: String, required: true },
    createdAt: {
        type: Date, default: Date.now
    }
});

module.exports = model('EmailConfirmationToken', emailTokenSchema);

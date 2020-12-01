const {Schema, model, Types} = require('mongoose')
const {constants} = require('../constants')

const userSchema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    imageUrl: {type: String, default: constants.DEFAULT_USER_IMAGE_URL}
    // links: [{ type: Types.ObjectId, ref: 'Link' }]
})

module.exports = model('User', userSchema)
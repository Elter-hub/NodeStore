const { Schema, model } = require('mongoose')
const { constants } = require('../constants')

const userSchema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    roles: {type: [String], default: ['ROLE_USER']},
    imageUrl: {type: String, default: constants.DEFAULT_USER_IMAGE_URL},
    isVerified: {type: Boolean, default: false}
})

module.exports = model('User', userSchema)
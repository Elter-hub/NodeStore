const Joi = require('joi');
const { constants: { PASSWORD_REGEX } } = require('../constants');

module.exports = Joi.object({
    email: Joi.string().email().required().max(40),
    password: Joi.string().min(8).max(25).regex(PASSWORD_REGEX)
});

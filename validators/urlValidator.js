const Joi = require('joi');
const { constants: { URL_REGEX } } = require('../constants');

module.exports = Joi.string().min(8).regex(URL_REGEX).required();

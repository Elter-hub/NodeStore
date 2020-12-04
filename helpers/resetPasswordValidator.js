const Joi = require('joi');
const { constants: { PASSWORD_REGEX } } = require('../constants');

module.exports = Joi.object({
    email: Joi.string().email().required().max(40),
    newPassword: Joi.string().min(8).max(25).regex(PASSWORD_REGEX)
        .error((errors) => {
            errors.forEach((err) => {
                if (err.code === 'string.pattern.base') {
                    err.message = 'Password should contain at least 1 small 1 Capital and 1 Digit!';
                }
            });
            return errors;
        })
});

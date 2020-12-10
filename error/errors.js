const { constants: { BAD_REQUEST, SERVER_ERROR, NOT_ALLOWED } } = require('../constants');

module.exports = {
    NOT_VALID_CONFIRMATION_TOKEN: {
        message: 'Provided token is incorrect',
        code: BAD_REQUEST
    },

    WRONG_PASSWORD: {
        message: 'Wrong password, please try again',
        code: BAD_REQUEST
    },

    PASSWORD_MISMATCH: {
        message: 'Old password isn\'t correct',
        code: BAD_REQUEST
    },

    EMAIL_DOESNT_EXIST: {
        message: 'Email that you entered not exists',
        code: BAD_REQUEST
    },

    NOT_VERIFIED: {
        message: 'Please confirm your registration',
        code: NOT_ALLOWED
    },

    SERVER_ERROR: {
        message: 'Something went wrong...',
        code: SERVER_ERROR
    }
};

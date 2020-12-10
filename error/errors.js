const {
    constants: {
        BAD_REQUEST, SERVER_ERROR, NOT_ALLOWED, UNAUTHORIZED, FORBIDDEN, CONFLICT
    }
} = require('../constants');

module.exports = {
    UNAUTHORIZED: {
        message: 'Please login, or sign up',
        code: UNAUTHORIZED
    },

    NOT_PERMITTED: {
        message: 'Permission restricted',
        code: FORBIDDEN
    },

    NOT_VERIFIED: {
        message: 'Please confirm your registration',
        code: NOT_ALLOWED
    },

    EMAIL_ALREADY_EXIST: {
        message: 'User with provided email already exists',
        code: CONFLICT
    },

    EMAIL_DOESNT_EXIST: {
        message: 'Email that you entered not exists',
        code: BAD_REQUEST
    },

    SERVER_ERROR: {
        message: 'Something went wrong...',
        code: SERVER_ERROR
    },

    NOT_VALID_CONFIRMATION_TOKEN: {
        message: 'Provided token is incorrect',
        code: BAD_REQUEST
    },

    INVALID_USER_DATA: {
        message: 'Please enter correct data',
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

    PASSWORD_IS_TO_WEAK: {
        message: 'Your password should consist of at least 1 small 1 capital and one digit,'
            + ' and should be longer than 6 characters ',
        code: BAD_REQUEST
    },

    INVALID_URL: {
        message: 'Please check url, seems it is incorrect',
        code: BAD_REQUEST
    },

};

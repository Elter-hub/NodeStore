module.exports = {
    DEFAULT_USER_IMAGE_URL: 'https://microhealth.com/assets/images/illustrations/personal-user-illustration-@2x.png',
    PASSWORD_REGEX: new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,20}'),
    URL_REGEX: new RegExp('^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?'
        + '|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\'
        + 'd|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)'
        + '*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$'),

    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_ALLOWED: 405,
    CONFLICT: 409,
    SERVER_ERROR: 500,

    ACCOUNT_VERIFIED: 'Congratulations you successfully confirm your email',
    USER_CREATED: 'New user is registered',
    USER_EXIST: 'User with provided email already exist!',
    CHANGE_PASSWORD: 'You can change password by filling next form',
    CHANGE_PASSWORD_SUCCESS: 'Your password is successively changed! ',
    NEW_PRODUCT_ADDED: 'New product was successfully added to store',
    PRODUCT_DELETED: 'Product was deleted from storage',
    PAYMENT_ACCEPTED: 'Thank you for your purchase',
    IMAGE_CHANGED: 'Congrats, you successfully changed image',
    INVALID_URL: 'Please check url, seems it is incorrect',
};

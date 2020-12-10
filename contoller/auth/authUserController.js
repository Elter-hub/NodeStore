const {
    createUser: { createNewUser }, login: { loginUser }, confirmEmail: { confirmEmail }, forgotPassword: { forgotPassword },
    resetPassword: { resetPassword }, refreshTokens: { refreshTokens }
} = require('../../services/auth');
const { userChangePassword, changeImageUrl } = require('../../services/userAction/userChangeProfile.service');

module.exports = {
    createUser: (req, res, next) => createNewUser(req, res, next, next),
    login: (req, res, next) => loginUser(req, res, next),
    confirmEmail: (req, res, next) => confirmEmail(req, res, next),
    changePassword: (req, res, next) => userChangePassword(req, res, next),
    changeImage: (req, res, next) => changeImageUrl(req, res, next),
    forgotPassword: (req, res, next) => forgotPassword(req, res, next),
    resetPassword: (req, res, next) => resetPassword(req, res, next),
    refreshTokens: (req, res, next) => refreshTokens(req, res, next)
};

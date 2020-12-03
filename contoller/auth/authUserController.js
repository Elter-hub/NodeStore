const {createUser: {createNewUser}, login: {loginUser}, confirmEmail: {confirmEmail}, forgotPassword:{forgotPassword},
       resetPassword: {resetPassword}, refreshTokens: {refreshTokens}} = require('../../services/auth');
const {userChangePassword, changeImageUrl} = require('../../services/userAction/userChangeProfile')

module.exports = {
    createUser: (req, res) => createNewUser(req, res),
    login:  (req, res) => loginUser(req, res),
    confirmEmail: (req, res) => confirmEmail(req, res),
    changePassword: (req, res) => userChangePassword(req, res),
    changeImage: (req, res) => changeImageUrl(req, res),
    forgotPassword: (req, res) => forgotPassword(req, res),
    resetPassword: (req, res) => resetPassword(req, res),
    refreshTokens: (req, res) => refreshTokens(req, res)
}
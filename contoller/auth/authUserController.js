const {createUser, login, confirmEmail, forgotPassword, resetPassword} = require('../../services/auth');
const {userChangePassword, changeImageUrl} = require('../../services/userAction/userChangeProfile')
module.exports = {
    createUser: (req, res) => createUser.createNewUser(req, res),
    login:  (req, res) => login.loginUser(req, res),
    confirmEmail: (req, res) => confirmEmail.confirmEmail(req, res),
    changePassword: (req, res) => userChangePassword(req, res),
    changeImage: (req, res) => changeImageUrl(req, res),
    forgotPassword: (req, res) => forgotPassword.forgotPassword(req, res),
    resetPassword: (req, res) => resetPassword.resetPassword(req, res)
}
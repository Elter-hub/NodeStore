const {createUser, login, confirmEmail} = require('../../services/auth');
const {userChangePassword, changeImageUrl} = require('../../services/userAction/userChangeProfile')
module.exports = {
    createUser: (req, res) => createUser.createNewUser(req, res),
    login:  (req, res) => login.loginUser(req, res),
    confirm: (req, res) => confirmEmail.confirmEmail(req, res),
    changePassword: (req, res) => userChangePassword(req, res),
    changeImage: (req, res) => changeImageUrl(req, res)
}
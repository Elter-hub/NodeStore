const {createUser, login} = require('../../services/auth')
module.exports = {
    createUser: (req, res) => createUser.createNewUser(req, res),
    login:  (req, res) => login.loginUser(req, res)
}
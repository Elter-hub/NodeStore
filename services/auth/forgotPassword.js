const User = require('../../models/User.model')

module.exports = {
    forgotPassword: async (req, res) => {
        try {
            const {email} = req.body;
            const user = await User.findOne({email})

            user ? res.status(200).json({message: 'You can change password by filling next form'})
                 : res.status(404).json({message: 'Email doesnt exist'})
        }catch (e){
            console.log(e)
            res.status(400).json({
                message: e
            })
        }
    }
}
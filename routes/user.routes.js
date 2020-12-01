const router = require('express').Router();

router.get('/', (req, res) => {
    console.log(req.body)
    res.send({
        message: 'Heres your users'
    })
})

module.exports = router
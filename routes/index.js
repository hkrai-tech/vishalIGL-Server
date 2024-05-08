const express = require('express')
const router = new express.Router()
const users = require('./users/users.routes');
const auth = require('./auth/auth.routes');


router.use('/auth', auth);

router.get('/', (req, res) => {
    console.log("hello")
    return res.status(200).json({
        msg: "Hello",
        status: "online"
    })
})


router.use('/users', users);

module.exports = router;
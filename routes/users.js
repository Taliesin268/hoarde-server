const router = require('express').Router();
const User = require('../models/User')
const crypto = require('crypto')

router.post('/users', (req, res) => {
    var user = new User();
    user.save().then(() => {
        res.send(JSON.stringify({
            message: `User successfully created with ID ${user.id}`,
            user: {
                id: user.id,
                name: user.name
            }
        }));
    });
});

module.exports = router;
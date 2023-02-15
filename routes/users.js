const router = require('express').Router();
const User = require('../models/User')

router.post('/users', (req, res) => {
    var user = new User(req.body.name);
    user.save().then(id => {
        res.send(JSON.stringify({
            message: `User successfully created with ID ${id}`,
            user: {
                id: id,
                name: user.name
            }
        }));
    });
});

module.exports = router;
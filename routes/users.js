const router = require('express').Router();
const User = require('../models/User')

router.post('/users', (req, res) => {
    var user = new User(req.body.name);
    user.save().then(id => {
        res.send(JSON.stringify({
            message: `User successfully created with ID ${id}`,
            data: {
                id: id
            }
        }));
    });
});

module.exports = router;
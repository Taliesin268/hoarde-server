const router = require('express').Router();
const User = require('../models/User')

// Route for creating new users
router.post('/users', (req, res) => {
    // Create a new User with no details, then save and return to client
    const user = new User();
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
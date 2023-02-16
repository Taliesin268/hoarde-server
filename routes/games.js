const router = require('express').Router();
const Game = require('../models/Game');
const User = require('../models/User')

router.post('/games', async (req, res) => {
    try {
        const creator = await User.findUserById(req.body.user_id);
        console.log('Creating new game with user ' + creator.name);
        const game = await Game.CreateGame(creator);
        res.status(201).send(JSON.stringify({
            message: 'Game created',
            game: {
                id: game.id
            }
        }));
    } catch (error) {
        console.error(error);
        res.status(404).send('User not found');
    }
});

module.exports = router;
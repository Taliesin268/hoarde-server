import express from 'express'
import logger from '../logger.js';
import Game from '../models/Game.js'
import User from '../models/User.js'

const router = express.Router();

// The route for creating a new game
router.post('/games', async (req, res) => {
    try {
        // First we want to find the user, if they don't exist, it will 404
        const creator = await User.find(req.body.user_id);
        logger.debug('Creating new game with user ' + creator.name);

        // Create a new game with that creator, save to the database, and send details back to client
        const game = new Game();
        game.creator = creator;
        game.save().then(() => {
            res.status(201).send(JSON.stringify({
                message: 'Game created',
                game: {
                    id: game.id
                }
            }));
        })
    } catch (error) {
        console.error(error);
        res.status(404).send('User not found');
    }
});

export default router;
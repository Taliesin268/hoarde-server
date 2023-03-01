import express from 'express'
import cards from '../data/cards.js'

const router = express.Router();

// Return a JSON encoded string of all the cards in data.
router.get('/cards', (req, res) => {
    res.send(JSON.stringify(cards));
});

export default router;

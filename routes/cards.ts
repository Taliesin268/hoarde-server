import express from 'express'
import { cards, tokens } from '../data/cards.js'

const router = express.Router();

// Return a JSON encoded string of all the cards in data.
router.get('/cards', (req, res) => {
    res.send(JSON.stringify(cards));
});

router.get('/tokens', (req, res) => {
    res.send(JSON.stringify(tokens));
})

export default router;

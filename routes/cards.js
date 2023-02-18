const router = require('express').Router();
const cards = require('../data/cards');

// Return a JSON encoded string of all the cards in data.
router.get('/cards', (req, res) => {
    res.send(JSON.stringify(cards));
});

module.exports = router;
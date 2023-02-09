const router = require('express').Router();
const cards = require('../data/cards');

router.get('/cards', (req, res) => {
    res.send(JSON.stringify(cards));
});

module.exports = router;
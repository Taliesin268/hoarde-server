const router = require('express').Router();
const knex = require('knex')(require('../knexfile.js'))

router.get('/cards', (req, res) => {
    cards = knex.select().from('cards').then((rows) => {
        res.send(JSON.stringify(rows));
    });
});

module.exports = router;
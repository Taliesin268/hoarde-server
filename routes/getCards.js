const express = require('express');
const router = express.Router();

// DB
const knex = require('knex')({
    client: process.env.DB_CLIENT,
    connection: {
        host: process.env.DB_HOST,
        port: process.env.DB_POST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
    }
});

router.get('/cards', (req, res) => {
    cards = knex.select().from('cards').then((rows) => {
        res.send(JSON.stringify(rows));
    });
});

module.exports = router;
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const Game = require('./models/Game')
const User = require('./models/User')

// Set up Express server
const app = express();
app.use(cors());
app.use(express.json());

// Setup Socket.IO
const http = require('http');
const { Server } = require('socket.io');
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:8080",
        methods: ["GET", "POST"]
    }
});

// Set up socket middleware for detecting connections
io.use((socket, next) => {
    const gameId = socket.handshake.query.gameId
    const userId = socket.handshake.query.userId
    console.log(`Caught user ${userId} for game ${gameId} in middleware`);

    if (!gameId || gameId == 'null' || !userId || userId == 'null') {
        console.log('Socket failed validation')
        next(new Error('Required a game id & user id'))
        return
    }


    try {
        // Check if the game exists
        Game.find(gameId).then((game) => {
            // Check if the user is the creator of the lobby
            if (game.creator.id == userId) {
                console.log('User is the creator!')
                socket.id = `${gameId}/${userId}`
                socket.join(gameId)
                next();
            } else if (!game.player) {
                // Check if the game has a player, if it doesn't, this user is the player
                User.find(userId).then((user) => {
                    console.log('User is a new player!')
                    game.player = user
                    game.save()
                    socket.id = `${gameId}/${userId}`
                    socket.join(gameId)
                    next()
                })
            } else if (game.player.id == userId) {
                // Finally, check if the player is already in the game
                console.log('User is a returning player!')
                socket.id = `${gameId}/${userId}`
                socket.join(gameId)
                next()
            } else {
                // If the user is not found in the game, and there isn't a free slot - reject the connection
                console.log(`User is not allowed in this game`)
                next(new Error(`User ${userId} not found in ${game.id}`))
            }
        })
    } catch (error) {
        next(error);
    }
})

// Set up baseline connection for sockets
io.on('connection', () => {
    console.log('a user connected');
});

// Routes
app.use(require('./routes/cards'));
app.use(require('./routes/users'));
app.use(require('./routes/games'));
app.use(express.static('./static'));

// Start listening for traffic
server.listen(process.env.PORT, () => {
    console.log(`Listening at http://localhost:${process.env.PORT}`);
})

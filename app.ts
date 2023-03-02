import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import http from 'http';
import Game from './models/Game.js';
import User from './models/User.js';
import cardsRouter from './routes/cards.js';
import usersRouter from './routes/users.js';
import gamesRouter from './routes/games.js';

dotenv.config()

// Set up Express server
const app = express();
app.use(cors());
app.use(express.json());

// Setup Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:8080",
        methods: ["GET", "POST"]
    }
});

// Set up socket middleware for detecting connections
io.use((socket, next) => {
    const gameId = socket.handshake.query.gameId as string
    const userId = socket.handshake.query.userId as string
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
                socket.join(gameId)
                next();
            } else if (!game.player) {
                // Check if the game has a player, if it doesn't, this user is the player
                User.find(userId).then((user) => {
                    console.log('User is a new player!')
                    game.player = user
                    game.save()
                    socket.join(gameId)
                    next()
                })
            } else if (game.player.id == userId) {
                // Finally, check if the player is already in the game
                console.log('User is a returning player!')
                socket.join(gameId)
                next()
            } else {
                // If the user is not found in the game, and there isn't a free slot - reject the connection
                console.log(`User is not allowed in this game`)
                next(new Error(`User ${userId} not found in ${game.id}`))
            }
        })
    } catch (error) {
        next(error as Error);
    }
})

// Set up baseline connection for sockets
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.emit('game update', "message")
});

// Routes
app.use(cardsRouter);
app.use(usersRouter);
app.use(gamesRouter);
app.use(express.static('./static'));

// Start listening for traffic
server.listen(process.env.PORT, () => {
    console.log(`Listening at http://localhost:${process.env.PORT}`);
})

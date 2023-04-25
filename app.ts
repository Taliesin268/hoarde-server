import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Server, Socket } from 'socket.io';
import http from 'http';
import Game from './models/Game.js';
import User from './models/User.js';
import cardsRouter from './routes/cards.js';
import usersRouter from './routes/users.js';
import gamesRouter from './routes/games.js';
import GAME_ACTIONS from './types/GameActions.js';
import logger from './logger.js';

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

// Set up baseline connection for sockets
io.on(GAME_ACTIONS.CONNECT, async (socket) => {
    try {
        socket.data.game = await Game.find(socket.handshake.query.gameId)
        socket.join(socket.data.game.id)
        socket.data.user = await User.find(socket.handshake.query.userId)
        await socket.data.game.processAction(GAME_ACTIONS.CONNECT, socket, io)
        socket.on(GAME_ACTIONS.DISCONNECT,
            async () => await socket.data.game.processAction(GAME_ACTIONS.DISCONNECT, socket, io)
        )
        socket.on(GAME_ACTIONS.SELECT_OPPONENT,
            async (data: { id: string, name: string }) => await socket.data.game.processAction(GAME_ACTIONS.SELECT_OPPONENT, data, io)
        )
        socket.on(GAME_ACTIONS.START_GAME,
            async () => await socket.data.game.processAction(GAME_ACTIONS.START_GAME, {}, io)
        )
        socket.on(GAME_ACTIONS.ACTIVATE_CARD,
            async (data: { card: number }) => await socket.data.game.processAction(GAME_ACTIONS.ACTIVATE_CARD, data, io)
        )
        socket.on(GAME_ACTIONS.END_TURN,
            async () => await socket.data.game.processAction(GAME_ACTIONS.END_TURN, { user: socket.data.user }, io)
        )
    } catch (error) {
        logger.error(`Caught error while connecting: ${error}`)
        socket.disconnect()
        throw error
    }
});



// Routes
app.use(cardsRouter);
app.use(usersRouter);
app.use(gamesRouter);
app.use(express.static('./static'));

// Start listening for traffic
server.listen(process.env.PORT, () => {
    logger.log('server', `Listening at http://localhost:${process.env.PORT}`);
})

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

function handleDisconnect(socket: Socket) {
    socket.data.game.processAction(GAME_ACTIONS.DISCONNECT, socket, io)
}

// Set up baseline connection for sockets
io.on(GAME_ACTIONS.CONNECT, async (socket) => {
    console.log('a user connected');
    try {
        const game = await Game.find(socket.handshake.query.gameId)
        const user = await User.find(socket.handshake.query.userId)
        socket.data.game = game
        socket.join(game.id)
        socket.data.user = user
        await game.processAction(GAME_ACTIONS.CONNECT, socket, io)
        console.log(`Sending data back to client`)
        socket.on(GAME_ACTIONS.DISCONNECT, async () => handleDisconnect(socket))
        socket.on(GAME_ACTIONS.SELECT_OPPONENT, 
            async (data: {id: string, name: string}) => socket.data.game.processAction(GAME_ACTIONS.SELECT_OPPONENT, data, io)
        )
    } catch (error) {
        console.log(`Caught error while connecting: ${error}`)
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
    console.log(`Listening at http://localhost:${process.env.PORT}`);
})

const express = require('express');
const cors = require('cors');
require('dotenv').config();

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

io.use((socket, next) => {
    const gameId = socket.handshake.query.gameId
    const userId = socket.handshake.query.userId

    console.log(`Caught user ${userId} for game ${gameId} in middleware`);

    next();
})

io.on('connection', (socket) => {
    console.log('a user connected');
});

// Routes
app.use(require('./routes/cards'));
app.use(require('./routes/users'));
app.use(require('./routes/games'));

app.use(express.static(__dirname + '/static'));

server.listen(process.env.PORT, () => {
    console.log(`Listening at http://localhost:${process.env.PORT}`);
})

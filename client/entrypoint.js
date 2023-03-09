require('dotenv').config();
const fs = require('fs');
const express = require('express');
const http = require('http');
const chokidar = require('chokidar');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);

app.use('/', express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

const io = socketio(server);
server.listen(process.env.PORT, '0.0.0.0', () => {
    console.log(`Running at http://localhost:${process.env.PORT}`);
});

chokidar.watch('public').on('change', () => {
    io.sockets.emit('reload');
});
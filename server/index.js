// Setup basic express server
const express = require('express');
const app = express();
const path = require('path');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log('Server listening at port %d', port);
});


app.get('/', (req, res) => {
    res.send('Hello World! poop')
})

// create a Socket.IO server, and attaching it to the http server

// get controller with game session functions
// const gameController = require('./game_controller');

// listen for Socket.IO connections
io.sockets.on('connection', function(socket) {
    console.log('client connected');
    gameController.initGameSession(io, socket);
});
// Setup basic express server
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3000;
const gameController = require('./gameController.js')
const restController = require('./restController.js')
require('./database.js')

// Init express webserver
server.listen(port, () => {
    console.log('Server listening at port %d', port);
});


app.get('/', (req, res) => {
    res.send('Rex!');
})

restController.iniRestManagement(app);


// create a Socket.IO server, and attaching it to the http server

// get controller with game session functions
gameController.initRoomManagement(io);

// listen for Socket.IO connections and init the game controller instance
io.sockets.on('connection', function(socket) {
    console.log('client connected');
    gameController.initMultiplayerGameSession(io, socket);
});
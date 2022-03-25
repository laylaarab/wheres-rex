// const path = require('path');
// reference from https://github.com/ericterpstra/anagrammatix/blob/master/agxgame.js-
const express = require('express');

// define the Express function handler 
const app = express();

// create a simple Express application
app.configure(function() {
    // Turn down the logging activity
    app.use(express.logger('dev'));

    // serve frontend from the public directory
    // app.use(express.static(path.join(__dirname, 'public')));
});

// create a node.js based http server on port 8080
const server = require('http').createServer(app).listen(process.env.PORT || 8080);

// create a Socket.IO server, and attaching it to the http server
const io = require('socket.io').listen(server);

// get controller with game session functions
const gameController = require('./game_controller');

// listen for Socket.IO connections
io.sockets.on('connection', function(socket) {
    console.log('client connected');
    gameController.initGameSession(io, socket);
});
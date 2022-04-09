// Setup basic express server
const express = require('express');
const app = express();
const path = require('path');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3000;
const gameController = require('./gameController.js')
const database = require('./database.js')

server.listen(port, () => {
    console.log('Server listening at port %d', port);
});


app.get('/', (req, res) => {
    res.send('Hello World! poop')
})

app.get('/api/user-stats/:userId', (req, res) => {
    const googleId = req.params.userId;
    games = database.getSinglePlayerUserGameResults(googleId);
    if (games.length == 0) {
        res.send({
            gamesPlayed: 0,
            bestScore: 0,
            avgScore: 0
        });
    } else {
        const scores = games.map((game) => game.score)
        const average = arr => arr.reduce((a, b) => a + b, 0) / arr.length;
        res.send({
            gamesPlayed: games.length,
            bestScore: Math.max(...scores),
            avgScore: Math.floor(average(scores)),
        });
    }
})


app.get('/api/single-game/result/:gameId', (req, res) => {
    res.send(database.getSinglePlayerGameResult(req.params.gameId));
})

app.get('/api/multi-game/result/:roomId/:gameId', (req, res) => {
    data = database.getMultiPlayerGameResult(req.params.roomId);
    finalScores = {}
    console.log(data)
    for (var key in data.game.scores) {
        finalScores[key] = {
            user: data.members[key],
            score: data.game.scores[key].reduce((a, b) => a + b.score, 0)
        }
    }
    res.send(finalScores)
})


// create a Socket.IO server, and attaching it to the http server

// get controller with game session functions
// const gameController = require('./game_controller');

gameController.initRoomManagement(io)

// listen for Socket.IO connections
io.sockets.on('connection', function(socket) {
    console.log('client connected');
    gameController.initGameSession(io, socket);
});
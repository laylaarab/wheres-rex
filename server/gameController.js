const database = require('./database.js')

const games = {}
module.exports.initGameSession = function(io, socket) {
    console.log('new client connected');
    //  socket.emit('connection', null);
    socket.on('disconnect', () => {
        console.log(`Disconnected from: ${socket.id}`)
    });

    socket.on('newSinglePlayerGame', (data, callback) => {
        console.log('new game from ' + socket.id)
        gameList = getGameList();
        games[socket.id] = {
            user: data,
            gameList: gameList,
            round: 0,
            scores: []
        };
    });

    socket.on('getImage', (data) => {
        sendNextImage(socket);
    });


    socket.on('submitGuess', (data) => {
        console.log('submitGuess from ' + socket.id)
        game = games[socket.id]
        if (!game) {
            console.error(`Game not found for ${socket.id}`)
            return;
        }
        //  Score is distance
        if (game.gameList[game.round]) {
            score = calcScore(game.gameList[game.round], data)
            console.log(`Got score ${score}`)
            game.scores.push({
                round: game.round,
                img: game.gameList[game.round],
                score: score
            });
            socket.emit('score', score);
        }
        game.round++;
        sendNextImage(socket);
    });
}

function sendNextImage(socket) {
    game = games[socket.id]
    if (!game) {
        console.error(`Game not found for ${socket.id}`)
        return;
    }
    console.log(`next image ${game.round} + ${game.gameList.length}`)
    if (game.round >= game.gameList.length) {
        console.log('game over')
        socket.emit('gameOver', null);
        database.addSinglePlayerGameHistory(socket.id, {
            game: games[socket.id],
            score: games[socket.id].scores.reduce((b, a) => b + a.score, 0)
        });

        delete games[socket.id];
    } else {
        console.log('getImage from ' + socket.id)
        socket.emit('newImage', game.gameList[game.round]);
    }
}

function calcScore(actual, guess) {
    return Math.floor(Math.sqrt(Math.pow(actual.x - guess.x, 2) + Math.pow(actual.y - guess.y, 2)))
}

function getGameList() {
    return [{
            img: 'img7.jpg',
            x: 200,
            y: 200
        },
        {
            img: 'img2.jpg',
            x: 100,
            y: 100
        },
        {
            img: 'img3.jpg',
            x: 40,
            y: 200
        }
    ]
}
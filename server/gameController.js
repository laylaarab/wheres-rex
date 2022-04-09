const database = require('./database.js')
const GAME_LENGTH = 5;
const MAX_SCORE = 460;
const games = {}

const multiPlayerGames = {}

const socketMap = {}

let multiPlayerLobby = {
    id: '',
    open: false
}

module.exports.initRoomManagement = function(io) {
    io.of("/").adapter.on("join-room", (room, id) => {
        members = io.sockets.adapter.rooms.get(room);
        console.log('Joined')
        console.log(members)
        membersMap = [...members].map((sockId) => socketMap[sockId]);
        io.to(room).emit('updateMembers', membersMap);
    });
    io.of("/").adapter.on("leave-room", (room, id) => {
        members = io.sockets.adapter.rooms.get(room);
        console.log('Left')
        console.log(members)
        membersMap = [...members].map((sockId) => socketMap[sockId]);
        io.to(room).emit('updateMembers', membersMap);
    });
}


module.exports.initGameSession = function(io, socket) {
    console.log('new client connected');
    //  socket.emit('connection', null);
    socket.on('disconnect', () => {
        console.log(`Disconnected from: ${socket.id}`)
    });
    // MultiPlayer

    socket.on('multiPlayerGame', (data, callback) => {
        console.log('new game lobby from ' + socket.id)

        socketMap[socket.id] = data;

        // Create a lobby
        if (!multiPlayerLobby.open) {
            multiPlayerLobby.open = true;
            multiPlayerLobby.id = `${socket.id}_${data.googleId}`
            console.log(`Creating a new lobby ${multiPlayerLobby.id}`)
            gameList = getGameList();
            multiPlayerGames[multiPlayerLobby.id] = {
                gameList: gameList,
                round: 0,
                scores: {}
            };
            socket.join(multiPlayerLobby.id)
        } else {
            console.log(`Joining lobby ${multiPlayerLobby.id}`)
            socket.join(multiPlayerLobby.id);
        }
        socket.emit('multiPlayerLobbyId', multiPlayerLobby.id)
    });


    socket.on('startMultiPlayer', (data, callback) => {
        // Create a lobby
        if (multiPlayerLobby.open) {
            console.log('start game ' + socket.id)
            roomId = multiPlayerLobby.id;
            multiPlayerLobby.open = false;
            members = io.sockets.adapter.rooms.get(multiPlayerLobby.id);
            members.forEach(member => {
                multiPlayerGames[multiPlayerLobby.id].scores[member] = []
            });
            io.to(roomId).emit('multiPlayerStarted', roomId);
            sendNextMultiPlayerImage(roomId);
        }
    });

    socket.on('multiPlayerGetImage', (roomId) => {
        sendNextMultiPlayerImage(roomId);
    });

    socket.on('multiPlayerSubmitGuess', (data) => {
        console.log('submitGuess from ' + socket.id)
        game = multiPlayerGames[data.lobbyId]
        if (!game) {
            console.error(`Game not found for ${socket.id}`)
            return;
        }
        //  Score is distance
        score = calcScore(game.gameList[game.round], data.coords)
        console.log(`Got score ${score}`)
        game.scores[socket.id].push({
            round: game.round,
            img: game.gameList[game.round],
            score: score
        });

        let roundDone = true;
        for (var key in game.scores) {
            roundDone &= game.scores[key].length >= game.round + 1
        }
        if (roundDone) {
            game.round++;
            sendNextMultiPlayerImage(roomId);
        }

        socket.emit('score', score);

        // game.round++;
        // sendNextImage(socket);
    });


    function sendNextMultiPlayerImage(roomId) {
        game = multiPlayerGames[roomId]
        if (!game) {
            console.error(`Game not found for ${socket.id}`)
            return;
        }
        console.log(`next image ${game.round} + ${game.gameList.length}`)
        if (game.round >= game.gameList.length) {
            console.log('game over')
            io.to(roomId).emit('gameOver', null);
            members = io.sockets.adapter.rooms.get(roomId);
            membersKV = {}
            membersMap = [...members].map((sockId) => {
                membersKV[sockId] = socketMap[sockId]
            });
            database.addMultiPlayerGameHistory(roomId, {
                game: multiPlayerGames[roomId],
                members: membersKV
            });

            delete multiPlayerGames[roomId]
        } else {
            console.log('getImage from ' + socket.id)
            io.to(roomId).emit('multiPlayerStarted', roomId);
            io.to(roomId).emit('newImage', game.gameList[game.round]);
        }
    }

    // SinglePlayer
    socket.on('newSinglePlayerGame', (data, callback) => {
        console.log('new game from ' + socket.id)
        socketMap[socket.id] = data;
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
            user: socketMap[socket.id],
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
    return MAX_SCORE - Math.floor(Math.sqrt(Math.pow(actual.x - guess.x, 2) + Math.pow(actual.y - guess.y, 2)))
}
// 
function getGameList() {
    return getRandomSubarray(database.getGames(), GAME_LENGTH);
}

// https://stackoverflow.com/questions/11935175/sampling-a-random-subset-from-an-array
function getRandomSubarray(arr, size) {
    var shuffled = arr.slice(0),
        i = arr.length,
        min = i - size,
        temp, index;
    while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(min);
}
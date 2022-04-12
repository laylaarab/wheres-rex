const database = require('./database.js')
const GAME_LENGTH = 5;
const MAX_SCORE = 460;
const games = {}

// Array of current multiplayer games
const multiPlayerGames = {}

// Map of userID to socketID
const socketMap = {}

// Multiplayer lobby object
let multiPlayerLobby = {
    id: '',
    open: false
}

// Manages the lobby rooms for the game
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

// Start a multiplayer game session
module.exports.initMultiplayerGameSession = function(io, socket) {
    console.log('new client connected');
    socket.on('disconnect', () => {
        console.log(`Disconnected from: ${socket.id}`)
    });
    socket.on('multiPlayerGame', (userData, callback) => {
        console.log('new game lobby from ' + socket.id)
            // add user's data to socket
        socketMap[socket.id] = userData;

        // Create a multiplayer lobby
        if (!multiPlayerLobby.open) {
            // Mark lobby as open to start a lobby
            multiPlayerLobby.open = true;
            multiPlayerLobby.id = `${socket.id}_${userData.googleId}`
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

    // start a multiplayer game
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
    // send an image to a multiplayer game
    socket.on('multiPlayerGetImage', (roomId) => {
        sendNextMultiPlayerImage(roomId);
    });

    // if the player sumbits their guess
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
        // Ensure that each player has submitted their guess 
        for (var key in game.scores) {
            roundDone &= game.scores[key].length >= game.round + 1
        }
        // if every player submitted a guess, move on to the next round
        if (roundDone) {
            game.round++;
            sendNextMultiPlayerImage(roomId);
        }
        // emit the user's score to them
        socket.emit('score', score);
    });

    // Send next game image to multiplayer games
    function sendNextMultiPlayerImage(roomId) {
        // Get game from multiplayer games array
        game = multiPlayerGames[roomId]
        if (!game) {
            console.error(`Game not found for ${socket.id}`)
            return;
        }
        console.log(`next image ${game.round} + ${game.gameList.length}`)
            // If we have gone through all the images for the game, end the game
        if (game.round >= game.gameList.length) {
            console.log('game over')
            io.to(roomId).emit('gameOver', null);
            members = io.sockets.adapter.rooms.get(roomId);
            membersKV = {}
            membersMap = [...members].map((sockId) => {
                membersKV[sockId] = socketMap[sockId]
            });
            // Add the game history for the game
            database.addMultiPlayerGameHistory(roomId, {
                game: multiPlayerGames[roomId],
                members: membersKV
            });
            // Delete the socketio room 
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
    // Get image for singleplayer game
    socket.on('getImage', (data) => {
        sendNextImage(socket);
    });

    // Submit a guess for a singleplayer game 
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
        // Move to next round
        game.round++;
        // send next round's image
        sendNextImage(socket);
    });
}

// Send the next image to the singleplayer game user
function sendNextImage(socket) {
    // get singleplayer game
    game = games[socket.id]
    if (!game) {
        console.error(`Game not found for ${socket.id}`)
        return;
    }
    console.log(`next image ${game.round} + ${game.gameList.length}`)
    if (game.round >= game.gameList.length) {
        console.log('game over')
        socket.emit('gameOver', null);

        // if game ended, add game history for the single player game
        database.addSinglePlayerGameHistory(socket.id, {
            user: socketMap[socket.id],
            game: games[socket.id],
            score: games[socket.id].scores.reduce((b, a) => b + a.score, 0)
        });
        // delete the room
        delete games[socket.id];
    } else {
        // if game not ended, send next image
        console.log('getImage from ' + socket.id)
        socket.emit('newImage', game.gameList[game.round]);
    }
}

// Calculate the user's round score
function calcScore(actual, guess) {
    return MAX_SCORE - Math.floor(Math.sqrt(Math.pow(actual.x - guess.x, 2) + Math.pow(actual.y - guess.y, 2)))
}

// Get the list of images to use for the game
function getGameList() {
    return getRandomSubarray(database.getGames(), GAME_LENGTH);
}

// From: https://stackoverflow.com/questions/11935175/sampling-a-random-subset-from-an-array
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
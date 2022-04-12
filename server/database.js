// Game histories
const singlePlayerGameHistory = {}
const multiPlayerGameHistory = {}

// Game history for a single player game
module.exports.addSinglePlayerGameHistory = function(gameId, game) {
    singlePlayerGameHistory[gameId] = game
}

// Game history for a multiplayer game
module.exports.addMultiPlayerGameHistory = function(roomId, game) {
    multiPlayerGameHistory[roomId] = game
}

// Game results for a single player game
module.exports.getSinglePlayerGameResult = function(gameId) {
    return singlePlayerGameHistory[gameId]
}

// Game results for a single player game for a specific user
module.exports.getAllSinglePlayerGameResults = function(userId) {
    const result = [];
    Object.keys(singlePlayerGameHistory).forEach(key => {
        if (singlePlayerGameHistory[key].user.googleId == userId) {
            result.push(singlePlayerGameHistory[key]);
        }
    })
    return result

}

// Game results for a single player game for all users
module.exports.getSinglePlayerLeaderboardResults = function() {
    // gamelist for each user
    let userGames = {};
    let userData = {};
    // iterate over the singleplayer games

    Object.keys(singlePlayerGameHistory).forEach(key => {
        game = singlePlayerGameHistory[key];
        userID = game.user.googleId;
        userData[userID] = {
            imageURL: game.user.imageUrl,
            name: game.user.name,
        };
        if (userGames[userID] == undefined) {
            userGames[userID] = [];
        }
        userGames[userID].push(game)
    });
    // aggregate data
    Object.keys(userGames).forEach(key => {
        console.log(userGames[key]);
        const scores = userGames[key].map((game) => game.score)
        userData[key].gamesPlayed = userGames[key].length;
        userData[key].bestScore = Math.max(...scores);
        userData[key].id = key;
    });
    return userData;
}

// Get the game result for a multiplayer game
module.exports.getMultiPlayerGameResult = function(roomId) {
    return multiPlayerGameHistory[roomId]
}

// The 360 images used for games
module.exports.getGames = function() {
    return [{
            img: 'AD-Garden.jpg',
            x: 300,
            y: 150
        },
        {
            img: 'CS-Class.jpg',
            x: 300,
            y: 150
        },
        {
            img: 'EEEL-side.jpg',
            x: 225,
            y: 20
        },
        {
            img: 'EEEL-Staircase.jpg',
            x: 245,
            y: 20
        }, {
            img: 'ENGG-Atrium.jpg',
            x: 170,
            y: 50
        },
        {
            img: 'ENGG-Sun.jpg',
            x: 189,
            y: 67
        },
        {
            img: 'ES-Elevators.jpg',
            x: 250,
            y: 55
        },
        {
            img: 'ICT-102.jpg',
            x: 220,
            y: 50
        },
        {
            img: 'MH-Entrance.jpg',
            x: 170,
            y: 135
        },
        {
            img: 'MH-Rock.jpg',
            x: 244,
            y: 126
        },
        {
            img: 'MT-Main.jpg',
            x: 255,
            y: 175
        },
        {
            img: 'Outside-Arch.jpg',
            x: 172,
            y: 178
        },
        {
            img: 'Outside-Suas.jpg',
            x: 347,
            y: 96
        },
        {
            img: 'SS-Frog.jpg',
            x: 308,
            y: 105
        },
        {
            img: 'ST-Class.jpg',
            x: 300,
            y: 80
        },
        {
            img: 'ST-Zipper.jpg',
            x: 305,
            y: 80
        },
        {
            img: 'TI-Main.jpg',
            x: 190,
            y: 103
        },
        {
            img: 'ZOO.jpg',
            x: 183,
            y: 50
        }
    ]
}
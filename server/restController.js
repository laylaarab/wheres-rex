const database = require('./database.js')

module.exports.iniRestManagement = function(app) {

    // User Stats rest API endpoints


    // Get the user stats for a user 
    app.get('/api/user-stats/:userId', (req, res) => {
        const googleId = req.params.userId;
        games = database.getAllSinglePlayerGameResults(googleId);
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

    // Get the user stats for all users in single player 
    app.get('/api/leaderboard', (req, res) => {
        let data = database.getSinglePlayerLeaderboardResults()
        var leaderboardData = Object.keys(data).map(key => {
            return data[key];
        })
        res.send(leaderboardData);
    });


    // Get results for a singleplayer game
    app.get('/api/single-game/result/:gameId', (req, res) => {
        res.send(database.getSinglePlayerGameResult(req.params.gameId));
    })

    // Get results for a multiplayer game
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
}
const singlePlayerGameHistory = {}
module.exports.addSinglePlayerGameHistory = function(gameId, game) {
    singlePlayerGameHistory[gameId] = game
}

module.exports.getSinglePlayerGameResult = function(gameId) {
    return singlePlayerGameHistory[gameId]
}
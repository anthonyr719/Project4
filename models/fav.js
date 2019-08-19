const mongoose = require('mongoose');

const favSchema = new mongoose.Schema({
    games: {
        type: String,
    },
    userRating: {
        type: String
    },
});

module.exports = Game;
const Job = mongoose.model('Fav', favSchema);

module.exports = Fav;
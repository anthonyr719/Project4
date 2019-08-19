const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    platform: {
        type: String
    },

});

const Job = mongoose.model('Game', gameSchema);

module.exports = Game;
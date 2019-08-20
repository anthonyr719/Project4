const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
    _user: {
        type: String,
    },
    userRating: {
        type: String
    },
    title: {
        type: String,
    },
    platform: {
        type: String,
    }
});

module.exports = favoriteSchema;
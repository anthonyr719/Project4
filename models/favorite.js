const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
    _user: {
        type: String,
    },
    userReview: {
        type: String
    },
    title: {
        type: String,
    },
    platform: {
        type: String,
    },
    description: {
        type: String,
    },
    image: {
        // api sends url for image
        type: String,
    },
});

module.exports = favoriteSchema;
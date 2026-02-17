const mongoose = require("mongoose");

const gameSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        Platform: {
            type: String,
            required: true
        },
        description: {
            type: String
        }
    }
);

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
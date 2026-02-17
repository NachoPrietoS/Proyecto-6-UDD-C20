const mongoose = require("mongoose");

const gameSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        platform: {
            type: String,
            required: true
        },
        description: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
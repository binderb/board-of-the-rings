const { Schema, model } = require("mongoose");

//import schemas from other models
const userSchema = require('./User');
const roomSchema = require('./Room')

const playerSchema = new Schema({
    currentSpace: {
        type: Number,
    },
    isMyTurn: {
        type: Boolean,
    },
    round: {
        type: Number,
    },
    roomId: [roomSchema],
    username: [userSchema],
})

const Player = model("Player", playerSchema);

module.exports = Player;
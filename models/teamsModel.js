const mongoose = require("mongoose");

const playersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

const teamsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    players: [playersSchema]
});

const matchSchema = new mongoose.Schema({
    team1: {
        type: teamsSchema,
        required: true
    },
    team2: {
        type: teamsSchema,
        required: true
    },
    winningTeam: {
        type: String,
        required: true,
        enum: ['Team 1', 'Team 2', 'Draw']
    },
});

module.exports = mongoose.model('Match', matchSchema);
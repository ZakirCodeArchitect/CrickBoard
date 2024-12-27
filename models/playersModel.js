const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    birthDate: { type: Date, required: true },
    birthPlace: { type: String, required: true },
    age: { type: String, required: true }, // Example: "37y 241d"
    battingStyle: { type: String, required: true },
    bowlingStyle: { type: String, required: true },
    playingRole: { type: String, required: true }
});

module.exports = mongoose.model('Player', PlayerSchema);

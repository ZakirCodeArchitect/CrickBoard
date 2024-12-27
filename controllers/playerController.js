const Player = require('../models/playersModel');

// getting players details from Database
const getPlayerDetails = async (req, res) => {
  try {
    const { playerName } = req.params;

        const player = await Player.findOne({ fullName: playerName });

        if (!player) {
            return res.status(404).render('player', { message: 'Player not found', player: null });
        }

        return res.render('player', { player });
  } catch (err) {
    console.log("Failed to get Players Details!!!");
    res.status(400).json({
      message: "Failed to Render Players Details!!!"
    });
  }
};

// inserting team players detaild in database
const insertPlayerDetails = async (req, res) => {
  try {
    const { 
        fullName, 
        birthDate, 
        birthPlace, 
        age, 
        battingStyle, 
        bowlingStyle, 
        playingRole 
    } = req.body;

    // Validate required fields
    if (!fullName || !birthDate || !birthPlace || !age || !battingStyle || !bowlingStyle || !playingRole) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Create a new instance
    const newPlayer = new Player({
        fullName,
        birthDate,
        birthPlace,
        age,
        battingStyle,
        bowlingStyle,
        playingRole
    });

    const savedPlayer = await newPlayer.save();

    return res.status(201).json({
        message: 'Players inserted successfully',
        player: savedPlayer
    });

} catch (error) {
    console.error('Error inserted player:', error.message);
    return res.status(500).json({ 
      message: 'Error inserting players', error: error.message 
    });
}
}

module.exports = { 
  getPlayerDetails,
  insertPlayerDetails 
};

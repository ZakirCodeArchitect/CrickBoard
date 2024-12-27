const FinalMatch = require("../models/teamsModel");

const getPlayerDetails = async (req, res) => {
  try {
    const { playerName } = req.params;

        // Search for player in both teams across all matches
        const match = await FinalMatch.findOne({
            $or: [
                { 'team1.players.name': playerName },
                { 'team2.players.name': playerName }
            ]
        });

        if (!match) {
            return res.status(404).render('player', { message: 'Player not found', player: null });
        }

        let player = match.team1.players.find(p => p.name === playerName) || 
                     match.team2.players.find(p => p.name === playerName);

        return res.render('player', { player });
  } catch (err) {
    console.log("Failed to get Players Details!!!");
    res.status(400).json({
      message: "Failed to Render Players Details!!!"
    });
  }
};

module.exports = { getPlayerDetails };

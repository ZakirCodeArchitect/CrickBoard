const Player = require("../models/playersModel");

// only redering .ejs page
const searchPlayerPage = async (req, res) => {
  try {
    res.render('searchPlayer', { error: null, player: null }); // renders the Search Player Page
  } catch (err) {
    console.log("Failed to Render Search Player Page!!!");
    res.status(400).json({
      message: "Failed to Render Search Player Page!!!"
    });
  }
};

// logic for searching the player after getting input from the FORM in .ejs
const searhPlayer = async (req, res)=>{
  try {
    const { playerName } = req.body;

    // Validate input
    if (!playerName || playerName.trim() === '') {
        return res.render('searchPlayer', { error: 'Player name is required!', player: null });
    }

    // Search from database -> case-insensitive
    const player = await Player.findOne({ fullName: { $regex: new RegExp(playerName, 'i') } });

    if (player) {
        return res.render('searchPlayer', 
          { 
            error: null, player 
          });
    } else {
        return res.render('searchPlayer', 
          { 
            error: 'Player not found!', 
            player: null 
          });
    }
} catch (err) {
    console.error(err);
    return res.render('searchPlayer', 
      { 
        error: 'An error occurred during search.', 
        player: null 
      });
}

}



module.exports = { 
  searchPlayerPage, 
  searhPlayer
};

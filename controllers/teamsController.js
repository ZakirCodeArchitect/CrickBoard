const FinalMatch = require('../models/teamsModel');
const insertTeams = async (req, res) =>{
  try{
    const {team1, team2, winningTeam} = req.body;

    if(!team1 || !team2 || !winningTeam)
    {
      return res.send("Enter all the details")
    }

    // inserting the teams name and there players and result
    const matchDetails = new FinalMatch({
      team1: {
        name: team1.name,
        players: team1.players.map(player => ({ name: player}))
      },
      team2: {
        name: team2.name,
        players: team2.players.map(player => ({ name: player}))
      },
      winningTeam
    })

    await matchDetails.save();

    return res.status(201).json({
      message: "ICC Men's T20 World Cup Final teams details",
      matchDetails
    })


  }catch(err)
  {
    console.log("Failed to insert teams data in Mongo!!!", err);
    res.status(500).json({
      message: "Failed to insert teams data in Mongo!!!"
    });
  }
}
const teamsDetails = async (req, res) => {
  try {
    const matches = await FinalMatch.find();

    if (!matches || matches.length === 0) {
        return res.status(404).render('teams', { 
          message: 'No match details found', 
          teamsData: null 
        });
    }

    // sending data to render 
    return res.render('teams', { teamsData: matches });
  } catch (err) {
    console.log("Failed to Render teams Page!!!");
    res.status(400).json({
      message: "Failed to Render teams Page!!!"
    });
  }
};



module.exports = { 
  insertTeams,
  teamsDetails
};

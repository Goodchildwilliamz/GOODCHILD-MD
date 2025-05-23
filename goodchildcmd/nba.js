const axios = require('axios');
const { ezra } = require("../goodchild/williamz");
const conf = require(__dirname + '/../set');

// NBA API Key and URL (replace with the correct API endpoint)
const apiKey = '351138f32da58d411e9c5cb74d514928'; // Replace with your actual API key
const apiUrl = 'https://api-basketball.p.rapidapi.com'; // Base NBA API URL

// Helper function to fetch NBA data from the API
const fetchNBAData = async (endpoint) => {
  try {
    const response = await axios.get(apiUrl + endpoint, {
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'api-basketball.p.rapidapi.com'
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// NBA command to handle selection of updates via number input
ezra({
  nomCom: "nba",
  categorie: "sports",
  reaction: "🏀",
  fromMe: true,
}, async (dest, zk, commandOptions) => {
  const { repondre, ms } = commandOptions;
  const userSelection = ms.body;  // User input, number to choose the option

  if (!userSelection) return await repondre("Please choose an option by typing a number!");

  let apiEndpoint = "";
  let responseTitle = "";

  switch (userSelection) {
    case "1":
      apiEndpoint = "/games?league=12&season=2024&live=all";
      responseTitle = "🏀 *Live NBA Matches:*";
      break;

    case "2":
      apiEndpoint = "/standings?league=12&season=2024";
      responseTitle = "📊 *NBA Standings:*";
      break;

    case "3":
      apiEndpoint = "/players/statistics?league=12&season=2024";
      responseTitle = "🔥 *Top NBA Scorers:*";
      break;

    case "4":
      apiEndpoint = "/games?league=12&season=2024&status=NS";
      responseTitle = "⏳ *Upcoming NBA Games:*";
      break;

    default:
      return await repondre("Invalid selection! Please choose a number between 1 and 4.");
  }

  // Fetch data from the NBA API
  try {
    const data = await fetchNBAData(apiEndpoint);
    if (!data || data.response.length === 0) {
      return await repondre("No data available at the moment.");
    }

    let message = `${responseTitle}\n\n`;

    // Process data based on the selected category
    if (userSelection === "1") { // Live Matches
      data.response.forEach(game => {
        message += `🏀 *${game.teams.home.name}* vs *${game.teams.away.name}*\n`;
        message += `🏆 *League:* ${game.league.name}\n`;
        message += `🕒 *Time:* ${game.status.short}\n`;
        message += `🔢 *Score:* ${game.scores.home} - ${game.scores.away}\n`;
        message += "––––––––––––––––––––––––––\n";
      });
    } else if (userSelection === "2") { // Standings
      data.response[0].standings.forEach(team => {
        message += `🔝 *${team.rank}.* ${team.team.name} - ${team.win}W/${team.lose}L\n`;
      });
    } else if (userSelection === "3") { // Top Scorers
      data.response.forEach(player => {
        message += `🔥 *${player.player.name}* (${player.team.name}) - ${player.points} PTS\n`;
      });
    } else if (userSelection === "4") { // Upcoming Games
      data.response.forEach(game => {
        message += `📅 *${game.date}*\n`;
        message += `🏀 *${game.teams.home.name}* vs *${game.teams.away.name}*\n`;
        message += "––––––––––––––––––––––––––\n";
      });
    }

    await repondre(message);
  } catch (error) {
    console.error("Error fetching NBA data:", error);
    await repondre("⚠️ Error fetching NBA updates. Try again later.");
  }
});

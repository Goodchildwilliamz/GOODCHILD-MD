const { ezra } = require("../goodchild/williamz");
const axios = require('axios'); // Ensure axios is imported
const conf = require(__dirname + "/../set");

ezra({
  nomCom: "hadith",
  aliases: ["islam", "hadees"],
  reaction: '📖',
  categorie: "Islam"
}, async (dest, zk, params) => {
  const { repondre } = params;

  try {
    const response = await axios.get("https://bk9.fun/Islam/hadith", {
      timeout: 10000 // 10 seconds timeout
    });

    if (response.status === 200 && response.data) {
      const hadithText = response.data.hadith || response.data; // Adjust based on API response format

      await zk.sendMessage(dest, {
        text: `📜 *Hadith of the Day:*\n\n"${hadithText}"`,
        contextInfo: {
          externalAdReply: {
            title: conf.BOT,
            body: "Islamic Teachings",
            thumbnailUrl: conf.URL,
            sourceUrl: "https://whatsapp.com/255763755563",
            mediaType: 1,
            showAdAttribution: true,
          },
        },
      });
    } else {
      throw new Error("Invalid response from Hadith API");
    }
  } catch (error) {
    console.error("Error fetching Hadith:", error.message);
    await repondre("Sorry, I couldn't fetch a Hadith at the moment.");
  }
});

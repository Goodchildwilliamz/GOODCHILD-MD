// cmd/menu.js
module.exports = {
  name: "menu",
  description: "Onyesha orodha ya commands kwa makundi",
  async execute(sock, msg, args) {
    const sender = msg.key.remoteJid;

    // Tuma picha ya banner kwanza
    await sock.sendMessage(sender, {
      image: { url: "https://files.catbox.moe/8spkl4.jpeg" },
      caption: "📜 *GOODCHILD-MD Menu*\n━━━━━━━━━━━━━━━━━━━"
    });

    // Tuma menu ya commands baada ya picha
    const menuText = `
👑 *OWNER COMMANDS*
- !owner
- !status
- !setname
- !setbio

👥 *GROUP COMMANDS*
- !add
- !kick
- !promote
- !demote
- !tagall
- !hidetag
- !setppgc
- !setdesc

🧠 *AI COMMANDS*
- !ai [swali lako]
- !blog [mada]
- !caption [picha]

🛠️ *TOOLS & UTILITY*
- !ping
- !menu
- !uptime
- !runtime

🎵 *MEDIA & DOWNLOAD*
- !ytmp3 [link]
- !ytmp4 [link]
- !play [query]
- !tiktok [link]

📌 *INFO*
- Bot Name: GOODCHILD-MD
- Owner: +255784404448
- GitHub: https://github.com/goodchildwilliamz
━━━━━━━━━━━━━━━━━━━
⏱️ Runtime: ${formatUptime(process.uptime())}
`;

    await sock.sendMessage(sender, { text: menuText });
  }
};

// Helper function to format uptime
function formatUptime(seconds) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  return `${hrs}h ${mins}m ${secs}s`;
  }

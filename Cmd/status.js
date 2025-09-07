// cmd/status.js
const os = require('os');
const process = require('process');
const config = require('../settings');

module.exports = {
  name: "status",
  description: "Onyesha hali ya bot kwa sasa",
  async execute(sock, msg, args) {
    const sender = msg.key.remoteJid;

    const uptime = formatUptime(process.uptime());
    const memoryUsage = process.memoryUsage().rss / 1024 / 1024; // in MB
    const totalCommands = fs.readdirSync('./cmd').length;

    const statusText = `
🟢 *GOODCHILD-MD STATUS*

📌 *Bot Name:* ${config.BOT_NAME || "GOODCHILD-MD"}
👤 *Owner:* ${config.OWNER_NUMBER}
📦 *Commands Loaded:* ${totalCommands}
⏱️ *Uptime:* ${uptime}
💾 *Memory Usage:* ${memoryUsage.toFixed(2)} MB
🌐 *Platform:* ${os.platform()} ${os.arch()}

✨ Bot is active and running smoothly. Keep creating. Keep automating.
`;

    await sock.sendMessage(sender, { text: statusText });
  }
};

// Helper function to format uptime
function formatUptime(seconds) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  return `${hrs}h ${mins}m ${secs}s`;
}

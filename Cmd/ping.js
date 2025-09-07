// cmd/ping.js
module.exports = {
  name: "ping",
  description: "Angalia kama bot iko hai",
  async execute(sock, msg, args) {
    const sender = msg.key.remoteJid;
    await sock.sendMessage(sender, { text: "🏓 Pong from GOODCHILD-MD!" });
  }
};

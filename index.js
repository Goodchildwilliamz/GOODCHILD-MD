// GOODCHILD-MD WhatsApp Bot
const { default: makeWASocket, useSingleFileAuthState } = require('@adiwajshing/baileys');
const { Boom } = require('@hapi/boom');
const fs = require('fs');
const path = require('path');
const config = require('./settings'); // settings.js with PREFIX, OWNER_NUMBER, etc.

// Load session
const { state, saveState } = useSingleFileAuthState('./session.json');

// Load all commands from /cmd folder
const commands = new Map();
fs.readdirSync('./cmd').forEach(file => {
  const command = require(./cmd/${file});
  if (command.name && typeof command.execute === 'function') {
    commands.set(command.name, command);
  }
});

// Start bot
async function startBot() {
  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: true,
    browser: [config.BOT_NAME || 'GOODCHILD-MD', 'Chrome', '1.0.0']
  });

  sock.ev.on('creds.update', saveState);

  sock.ev.on('messages.upsert', async ({ messages }) => {
    const msg = messages[0];
    if (!msg.message) return;

    const sender = msg.key.remoteJid;
    const text = msg.message.conversation || msg.message.extendedTextMessage?.text;
    const prefix = config.PREFIX || "!";

    if (!text || !text.startsWith(prefix)) return;

    const args = text.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = commands.get(commandName);
    if (command) {
      try {
        await command.execute(sock, msg, args);
      } catch (err) {
        console.error(❌ Error executing ${commandName}:, err);
        await sock.sendMessage(sender, { text: "⚠️ Kuna tatizo kwenye command hiyo." });
      }
    }
  });

  console.log(✅ ${config.BOT_NAME || 'GOODCHILD-MD'} is live and listening...);
}

startBot();
`

// GOODCHILD-MD WhatsApp Bot
const { default: makeWASocket, useSingleFileAuthState } = require('@adiwajshing/baileys');
const { Boom } = require('@hapi/boom');
const fs = require('fs');

// Load session
const { state, saveState } = useSingleFileAuthState('./session.json');

// Start bot
async function startBot() {
  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: true,
    browser: ['GOODCHILD-MD', 'Chrome', '1.0.0']
  });

  sock.ev.on('creds.update', saveState);

  sock.ev.on('messages.upsert', async ({ messages }) => {
    const msg = messages[0];
    if (!msg.message) return;

    const sender = msg.key.remoteJid;
    const text = msg.message.conversation || msg.message.extendedTextMessage?.text;

    // Basic commands
    if (text === '!ping') {
      await sock.sendMessage(sender, { text: '🏓 Pong from GOODCHILD-MD!' });
    }

    if (text === '!owner') {
      await sock.sendMessage(sender, {
        text: '👑 Bot Owner: +255784404448\nGitHub: https://github.com/goodchildwilliamz'
      });
    }

    if (text === '!menu') {
      await sock.sendMessage(sender, {
        text: `📜 GOODCHILD-MD Menu:
- !ping
- !owner
- !menu
More commands coming soon...`
      });
    }

    // Add more custom commands below...
  });

  console.log('✅ GOODCHILD-MD is live and listening...');
}

startBot();
require('dotenv').config(); // Soma .env file
require('./session-loader'); // Tengeneza session file

const fs = require('fs');
const pino = require('pino');
const { default: Maher_Zubair } = require('maher-zubair-baileys');

async function startBot() {
  try {
    const authInfo = JSON.parse(fs.readFileSync('./auth_info.json'));

    const bot = Maher_Zubair({
      auth: authInfo,
      printQRInTerminal: false,
      logger: pino({ level: 'fatal' }),
      browser: ['GOODCHILD-MD', 'Chrome', '1.0.0']
    });

    bot.ev.on('connection.update', async (update) => {
      const { connection } = update;

      if (connection === 'open') {
        console.log('✅ GOODCHILD-MD is now connected to WhatsApp');

        await bot.sendMessage(bot.user.id, {
          text: `*_GOODCHILD-MD is Online_*\n\n🤖 Created by Mr Goodchild Williamz\n📞 wa.me/255784404448`
        });
      }

      if (connection === 'close') {
        console.log('❌ Connection closed. Restarting...');
        startBot(); // Retry
      }
    });

    bot.ev.on('creds.update', (creds) => {
      fs.writeFileSync('./auth_info.json', JSON.stringify(creds, null, 2));
    });

  } catch (err) {
    console.error('❌ Failed to start bot:', err);
  }
}

startBot();

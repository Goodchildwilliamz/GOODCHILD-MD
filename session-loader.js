require('dotenv').config(); // Soma .env file

const fs = require('fs');
const path = require('path');

const sessionString = process.env.SESSION_ID;

if (!sessionString || !sessionString.includes(';;;')) {
  console.error('❌ SESSION_ID is missing or invalid.');
  process.exit(1);
}

const base64 = sessionString.split(';;;')[1];
const decoded = Buffer.from(base64, 'base64');

// Andika session file (mfano: creds.json au auth_info.json)
fs.writeFileSync(path.join(__dirname, 'auth_info.json'), decoded);

console.log('✅ SESSION ID loaded successfully. Bot is ready to connect.'); 

const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage'
        ]
    }
});

// QR Code
client.on('qr', (qr) => {
    console.log('QR RECEIVED');
    qrcode.generate(qr, { small: true });
});

// Ready
client.on('ready', () => {
    console.log('BOT IS READY');
});

// Message
client.on('message', msg => {
    if (msg.body.toLowerCase() === 'hi') {
        msg.reply('Hello 👋 Bot is working!');
    }
});

client.initialize();

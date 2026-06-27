const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('📲 امسح الكود من واتساب للدخول');
});

client.on('ready', () => {
    console.log('✅ البوت جاهز للعمل');
});

client.on('message', async msg => {
    console.log(`📩 رسالة من ${msg.from}: ${msg.body}`);

    if (msg.body.toLowerCase() === 'مرحبا') {
        await msg.reply('أهلاً! كيف حالك؟');
    }
});

client.initialize();

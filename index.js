const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// ضع مفتاح Gemini إذا عندك
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "YOUR_API_KEY");

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    }
});

// QR Code
client.on('qr', (qr) => {
    console.log('QR RECEIVED');
    qrcode.generate(qr, { small: true });
});

// جاهز
client.on('ready', () => {
    console.log('WhatsApp Bot is ready!');
});

// الرسائل
client.on('message', async msg => {
    if (!msg.body) return;

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const result = await model.generateContent(msg.body);
        const response = await result.response;
        const text = response.text();

        msg.reply(text);

    } catch (err) {
        console.error(err);
        msg.reply("حدث خطأ في الرد 🤖");
    }
});

// تشغيل البوت
client.initialize();

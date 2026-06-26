const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { GoogleGenAI } = require('@google/generative-ai');

// 1. إعداد الذكاء الاصطناعي من جوجل
const aiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI(aiKey);
const model = ai.getGenerativeModel({ model: "gemini-pro" });

// 2. إعداد وتشغيل بوت واتساب
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

// 3. توليد كود QR في لوحة تحكم السيرفر لمسحه بالهاتف
client.on('qr', (qr) => {
    console.log('--- امسح كود الـ QR التالي عبر واتساب هاتفك ---');
    qrcode.generate(qr, { small: true });
});

// 4. رسالة تأكيد عند نجاح الاتصال بواتساب
client.on('ready', () => {
    console.log('🎉 مبارك! البوت متصل الآن بواتساب وجاهز للرد تلقائياً!');
});

// 5. استقبال الرسائل والرد عليها بالذكاء الاصطناعي
client.on('message', async (msg) => {
    // يرد فقط على الخاص وتجنب المجموعات
    if (msg.from.endsWith('@c.us')) {
        try {
            const chat = await msg.getChat();
            await chat.sendStateTyping(); // إظهار جاري الكتابة...

            const result = await model.generateContent(msg.body);
            const response = await result.response;
            const replyText = response.text();

            await msg.reply(replyText);
        } catch (error) {
            console.error('حدث خطأ أثناء معالجة الرسالة:', error);
        }
    }
});

client.initialize();

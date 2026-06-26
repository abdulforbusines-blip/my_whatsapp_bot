const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// 1. إعداد الذكاء الاصطناعي من جوجل (Gemini)
const aiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenerativeAI(aiKey);
const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

// 2. إعداد وتشغيل بوت واتساب
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        // تم حذف سطر executablePath القديم ليعتمد السيرفر على الكروم الداخلي تلقائياً
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--single-process',
            '--disable-gpu'
        ]
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
    if (msg.from.endsWith('@c.us')) {
        try {
            const chat = await msg.getChat();
            await chat.sendStateTyping(); 

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

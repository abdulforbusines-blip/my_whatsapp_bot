const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const chromium = require('chromium');

// إعداد عميل واتساب
const client = new Client({
    puppeteer: {
        executablePath: chromium.path, // استخدام Chromium المثبت بدل التحميل
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

// عرض QR في الطرفية لتسجيل الدخول
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('📲 امسح الكود من واتساب للدخول');
});

// عند تسجيل الدخول
client.on('ready', () => {
    console.log('✅ البوت جاهز للعمل');
});

// مثال: الرد على أي رسالة تصل
client.on('message', async msg => {
    console.log(`📩 رسالة من ${msg.from}: ${msg.body}`);

    if (msg.body.toLowerCase() === 'مرحبا') {
        await msg.reply('أهلاً! كيف حالك؟');
    }
});

// تشغيل العميل
client.initialize();

const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// إنشاء عميل واتساب
const client = new Client({
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

// عرض QR في الطرفية لتسجيل الدخول
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('📲 امسح الكود للدخول إلى واتساب');
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

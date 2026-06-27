const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const QRCode = require('qrcode');
const chromium = require('chromium');

// إعداد عميل واتساب مع حفظ الجلسة
const client = new Client({
    authStrategy: new LocalAuth(), // يحفظ الجلسة في مجلد .wwebjs_auth
    puppeteer: {
        executablePath: chromium.path,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

// عرض QR في الطرفية بحجم أوضح + حفظه كصورة
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: false }); // حجم أكبر
    console.log('📲 امسح الكود من واتساب للدخول (مرة واحدة فقط)');

    QRCode.toFile('qr.png', qr, function (err) {
        if (err) throw err;
        console.log('📂 تم حفظ QR في ملف qr.png (افتحه وامسحه بالكاميرا)');
    });
});

// عند تسجيل الدخول
client.on('ready', () => {
    console.log('✅ البوت جاهز للعمل بدون إعادة مسح QR');
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

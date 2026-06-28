const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
    }
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('📌 امسح هذا الكود من واتساب على هاتفك عبر الأجهزة المقترنة → ربط جهاز');
});

client.on('ready', () => {
    console.log('✅ البوت جاهز للعمل');
});

client.on('message', async msg => {
    const now = new Date();
    const hour = now.getHours();

    const startHour = 9;   // بداية الدوام (9 صباحًا)
    const endHour = 17;    // نهاية الدوام (5 مساءً)

    if (hour >= startHour && hour < endHour) {
        // الرد في أوقات الدوام على أي رسالة
        await msg.reply(`👋 أهلاً! شكراً لرسالتك. نحن متاحون الآن لأننا في وقت الدوام.`);
    } else {
        // خارج أوقات الدوام
        await msg.reply(`⏰ حالياً خارج أوقات الدوام. سنرد عليك لاحقاً.`);
    }
});

client.initialize();

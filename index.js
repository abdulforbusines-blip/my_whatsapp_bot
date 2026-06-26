const puppeteer = require('puppeteer');
const qrcode = require('qrcode-terminal');

(async () => {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    await page.goto('https://web.whatsapp.com');

    console.log("📌 امسح QR من هنا:");

    // نعرض QR من الصفحة
    page.on('console', msg => {
        console.log(msg.text());
    });

})();

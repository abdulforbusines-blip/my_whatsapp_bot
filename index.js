const { Client, LocalAuth } = require("whatsapp-web.js");
const puppeteer = require("puppeteer");

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        executablePath: puppeteer.executablePath(),
        headless: true,
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-dev-shm-usage",
            "--no-zygote",
            "--single-process"
        ]
    }
});

client.on("qr", qr => {
    console.log("QR:");
    console.log(qr);
});

client.on("ready", () => {
    console.log("WhatsApp Ready");
});

client.initialize();

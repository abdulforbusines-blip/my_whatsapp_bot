const express = require("express");
const { Client, LocalAuth } = require("whatsapp-web.js");

const app = express();

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
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

app.get("/", (req, res) => {
    res.send("Bot running");
});

app.listen(process.env.PORT || 10000, () => {
    console.log("Server started");
});

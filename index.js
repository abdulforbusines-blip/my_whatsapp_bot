const express = require("express");
const { Client } = require("whatsapp-web.js");

const app = express();

const client = new Client({
    puppeteer: {
        headless: true,
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-dev-shm-usage",
            "--single-process"
        ]
    }
});

client.on("qr", qr => {
    console.log("QR CODE:");
    console.log(qr);
});

client.on("ready", () => {
    console.log("WhatsApp Ready");
});

client.on("message", msg => {
    if (msg.body === "ping") {
        msg.reply("pong");
    }
});

client.initialize();

app.get("/", (req, res) => {
    res.send("Bot running");
});

app.listen(process.env.PORT || 10000, () => {
    console.log("Server started");
});

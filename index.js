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

    if (msg.body === "hello") {
        msg.reply("hi 👋");
    }
});

client.initialize();

app.get("/", (req, res) => {
    res.send("Bot is running");
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
    console.log("Server started on port", PORT);
});

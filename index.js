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
    console.log("SCAN QR BELOW:");
    console.log(qr);
});

client.on("ready", () => {
    console.log("WhatsApp Ready");
});

client.on("auth_failure", msg => {
    console.log("AUTH FAILED", msg);
});

client.on("disconnected", reason => {
    console.log("Disconnected:", reason);
});

client.initialize();

app.get("/", (req, res) => {
    res.send("Bot running");
});

app.listen(process.env.PORT || 10000, () => {
    console.log("Server started");
});

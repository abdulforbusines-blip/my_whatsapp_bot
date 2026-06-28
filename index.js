const express = require("express");
const { Client } = require("whatsapp-web.js");

const app = express();

const client = new Client({
    puppeteer: {
        headless: true,
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-dev-shm-usage"
        ]
    }
});

client.on("qr", qr => {
    console.log("SCAN THIS QR:");
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

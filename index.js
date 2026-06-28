const express = require("express");
const { Client } = require("whatsapp-web.js");

const app = express();

const client = new Client({
    puppeteer: {
        headless: "new",
        executablePath: process.env.CHROME_PATH || undefined,
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-dev-shm-usage",
            "--disable-gpu",
            "--no-zygote"
        ]
    },
    webVersionCache: {
        type: "none"
    }
});

client.on("qr", (qr) => {
    console.log("SCAN THIS QR:");
    console.log(qr);
});

client.on("ready", () => {
    console.log("WhatsApp Ready");
});

client.on("auth_failure", () => {
    console.log("AUTH FAILED");
});

client.initialize();

app.get("/", (req, res) => {
    res.send("Bot running");
});

app.listen(process.env.PORT || 10000, () => {
    console.log("Server started");
});

const express = require("express");
const { Client, LocalAuth } = require("whatsapp-web.js");
const { execSync } = require("child_process");

const app = express();

/* 🔥 إصلاح Chrome في Render */
try {
    execSync("npx puppeteer browsers install chrome");
} catch (e) {}

const client = new Client({
    authStrategy: new LocalAuth(),
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

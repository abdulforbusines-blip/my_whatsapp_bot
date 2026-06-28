const express = require("express");
const { Client, LocalAuth } = require("whatsapp-web.js");

const app = express();

const client = new Client({
    authStrategy: new LocalAuth()
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

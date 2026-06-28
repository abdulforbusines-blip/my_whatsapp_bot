require("dotenv").config();

const express = require("express");
const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const OpenAI = require("openai");
const puppeteer = require("puppeteer");

const app = express();

const clientAI = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        executablePath: puppeteer.executablePath(),
        headless: true,
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-dev-shm-usage",
            "--disable-gpu",
            "--no-zygote",
            "--single-process",
            "--no-first-run"
        ]
    }
});

client.on("qr", qr => {
    console.log("امسح QR");
    qrcode.generate(qr, { small: true });
});

client.on("authenticated", () => {
    console.log("Authenticated");
});

client.on("ready", () => {
    console.log("WhatsApp Ready");
});

client.on("message", async message => {

    if (message.fromMe) return;

    try {

        const response = await clientAI.responses.create({
            model: "gpt-5",
            input: message.body
        });

        await message.reply(response.output_text);

    } catch (err) {

        console.log(err);

        await message.reply("حدث خطأ.");

    }

});

client.initialize();

app.get("/", (req, res) => {
    res.send("Bot Running");
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
    console.log("Server Started");
});

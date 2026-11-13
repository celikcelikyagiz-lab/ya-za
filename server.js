const express = require("express");
const path = require("path");
const { exec } = require("child_process");

const app = express();
const PORT = 3000;
const OLLAMA = "http://127.0.0.1:11434";

app.use(express.json({ limit: "20mb" }));

// Ana sayfa
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "yagiz ai.html"));
});

// Ollama bağlantı kontrolü
app.get("/api/status", async (req, res) => {
    try {
        const r = await fetch(OLLAMA + "/api/tags");
        res.json({ connected: r.ok });
    } catch {
        res.json({ connected: false });
    }
});

// Modeller
app.get("/api/models", async (req, res) => {
    try {
        const r = await fetch(OLLAMA + "/api/tags");
        res.status(r.status).json(await r.json());
    } catch {
        res.status(503).json({ error: "Ollama çalışmıyor." });
    }
});

// Yapay zekâ sohbeti
app.post("/api/chat", async (req, res) => {
    try {
        const r = await fetch(OLLAMA + "/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: req.body.model || "qwen2.5:3b",
                messages: req.body.messages || [],
                stream: false
            })
        });

        const data = await r.json();
        res.status(r.status).json(data);
    } catch (error) {
        res.status(500).json({
            error: "Ollama bağlantısı kurulamadı."
        });
    }
});

// Sunucuyu başlat
app.listen(PORT, "0.0.0.0", () => {
    console.log("--------------------------------");
    console.log("       YAGIZ AI BASLATILDI");
    console.log("--------------------------------");
    console.log("Bilgisayar: http://localhost:3000");
    console.log("Telefon: Bilgisayarın-IP-adresi:3000");
    console.log("--------------------------------");

    exec('start "" "http://localhost:3000"');
});
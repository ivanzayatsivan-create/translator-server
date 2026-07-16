const express = require("express");

const app = express();

app.use(express.json());

app.post("/translate", async (req, res) => {
    const { text, target } = req.body;

    try {
        const response = await fetch("https://libretranslate.com/translate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                q: text,
                source: "auto",
                target: target,
                format: "text"
            })
        });

        const data = await response.json();

        res.json({
            translated: data.translatedText
        });

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});

app.get("/", (req, res) => {
    res.send("Translator server is running!");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
});

const express = require("express");

const app = express();

app.use(express.json());


// Проверка сервера
app.get("/", (req, res) => {
    res.send("Translator server is running!");
});


// Перевод
app.post("/translate", async (req, res) => {

    try {

        const { text, target } = req.body;


        if (!text) {
            return res.status(400).json({
                error: "No text"
            });
        }


        const response = await fetch(
            "https://translate.argosopentech.com/translate",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    q: text,
                    source: "auto",
                    target: target || "en",
                    format: "text"
                })
            }
        );


        const data = await response.json();


        res.json({
            translated: data.translatedText
        });


    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});


const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
    console.log("Server started on port " + PORT);
});

const express = require("express");

const app = express();

app.use(express.json());


// Проверка сервера
app.get("/", (req, res) => {
    res.send("Translator server is running!");
});


// Перевод
app.post("/translate", async (req, res) => {

    const text = req.body.text;
    const target = req.body.target || "en";

    if (!text) {
        return res.status(400).json({
            error: "No text"
        });
    }


    try {

        const response = await fetch(
            "https://libretranslate.com/translate",
            {
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
            }
        );


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


// Если открыть /translate в браузере
app.get("/translate", (req,res)=>{
    res.send("Use POST request");
});


const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
    console.log("Server started on port " + PORT);
});

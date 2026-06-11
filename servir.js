const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const OpenAI = require("openai");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get("/", (req, res) => {
  res.json({
    name: "NEXUS",
    status: "online"
  });
});

app.get("/status", (req, res) => {
  res.json({
    system: "NEXUS",
    status: "online",
    time: new Date()
  });
});

app.post("/nexus", async (req, res) => {
  try {

    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        error: "Falta el mensaje"
      });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content: "Eres NEXUS, una IA avanzada."
        },
        {
          role: "user",
          content: message
        }
      ]
    });

    res.json({
      success: true,
      reply: response.choices[0].message.content
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      error: error.message
    });

  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`NEXUS ejecutándose en puerto ${PORT}`);
});

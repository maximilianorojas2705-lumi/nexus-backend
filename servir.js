const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.json({
    status: "NEXUS backend online"
  });
});app.get("/status", (req, res) => {
  res.json({
    system: "NEXUS",
    status: "online",
    time: new Date().toISOString()
  });
});app.post("/nexus", (req, res) => {
  const input = req.body.input;

  if (!input) {
    return res.json({ error: "No input provided" });
  }

  const text = input.toLowerCase();

  let response = "";
  let type = "unknown";

  if (text.includes("hola")) {
    response = "Hola 👋 soy NEXUS";
    type = "greeting";
  } 
  else if (text.includes("quien eres")) {
    response = "Soy NEXUS, tu IA backend";
    type = "identity";
  } 
  else {
    response = `Procesé: "${input}"`;
    type = "default";
  }

  res.json({
    input,
    response,
    type,
    status: "processed"
  });
});const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

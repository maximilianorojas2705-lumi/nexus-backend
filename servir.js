const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.get("/status", (req, res) => {
  res.json({
    system: "NEXUS",
    status: "online",
    message: "Servidor funcionando correctamente",
    time: new Date().toISOString()
  });
});app.get("/health", (req, res) => {
  res.json({
    ok: true,
    uptime: process.uptime(),
    memory: process.memoryUsage()
  });
});app.post("/nexus", (req, res) => {
  const input = req.body.input;

  if (!input) {
    return res.json({
      error: "No input provided"
    });
  }

  res.json({
    input: input,
    response: "NEXUS recibió tu mensaje",
    status: "processing"
  });
});
app.get("/", (req, res) => {
  res.json({
    status: "NEXUS backend online",
    message: "Servidor funcionando correctamente"
  });
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

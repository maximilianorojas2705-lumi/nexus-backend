const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// =====================
// ROUTES
// =====================

app.get("/", (req, res) => {
  res.json({
    status: "NEXUS backend online",
    message: "Servidor funcionando correctamente"
  });
});

app.get("/status", (req, res) => {
  res.json({
    system: "NEXUS",
    status: "online",
    message: "Servidor funcionando correctamente",
    time: new Date().toISOString()
  });
});

app.get("/health", (req, res) => {
  res.json({
    ok: true,
    uptime: process.uptime(),
    memory: process.memoryUsage()
  });
});
app.post("/nexus", (req, res) => {
  const input = req.body.input;

  if (!input) {
    return res.json({
      error: "No input provided"
    });
  }

  const text = input.toLowerCase();

  let response = "";
  let type = "unknown";

  // 🧠 lógica básica tipo "cerebro"
  if (text.includes("hola") || text.includes("hi")) {
    response = "Hola 👋 soy NEXUS. ¿En qué te ayudo?";
    type = "greeting";
  } 
  else if (text.includes("qué eres") || text.includes("quien eres")) {
    response = "Soy NEXUS, un sistema backend en evolución.";
    type = "identity";
  } 
  else if (text.includes("status")) {
    response = "El sistema está operativo y funcionando correctamente.";
    type = "status";
  } 
  else if (text.includes("ayuda")) {
    response = "Puedo responder mensajes básicos y evolucionar a IA completa.";
    type = "help";
  } 
  else {
    response = `Procesé tu mensaje: "${input}"`;
    type = "default";
  }

  res.json({
    input: input,
    response: response,
    type: type,
    status: "processed"
  });
});
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

// =====================
// START SERVER
// =====================

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

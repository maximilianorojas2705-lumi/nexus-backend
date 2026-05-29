const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

/* =========================
   RUTA PRINCIPAL
========================= */
app.get("/", (req, res) => {
  res.json({
    status: "NEXUS backend online"
  });
});

/* =========================
   STATUS
========================= */
app.get("/status", (req, res) => {
  res.json({
    system: "NEXUS",
    status: "online",
    time: new Date().toISOString()
  });
});

/* =========================
   IA NEXUS
========================= */
app.post("/nexus", (req, res) => {
  const userMessage = req.body.message;

  if (!userMessage) {
    return res.status(400).json({
      error: "Falta el mensaje"
    });
  }

  const response = generarRespuestaIA(userMessage);

  res.json({
    system: "NEXUS-IA",
    input: userMessage,
    response: response,
    status: "processed"
  });
});

/* =========================
   FUNCIÓN IA
========================= */
function generarRespuestaIA(texto) {
  const msg = texto.toLowerCase();

  if (msg.includes("hola")) {
    return "Hola 👋 soy NEXUS, tu asistente.";
  }

  if (msg.includes("como estas")) {
    return "Estoy funcionando correctamente ⚡";
  }

  if (msg.includes("que eres")) {
    return "Soy una IA básica creada en Node.js.";
  }

  return "No entiendo aún esa pregunta, pero estoy aprendiendo 🤖";
}

/* =========================
   SERVIDOR
========================= */
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

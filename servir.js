require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

// ======================
// CONFIGURACIÓN
// ======================

app.use(cors());
app.use(express.json());

// ======================
// RUTA PRINCIPAL
// ======================

app.get("/", (req, res) => {
  res.json({
    system: "NEXUS",
    status: "online",
    message: "Servidor funcionando correctamente",
    time: new Date().toISOString()
  });
});

// ======================
// STATUS DEL SISTEMA
// ======================

app.get("/status", (req, res) => {
  res.json({
    ok: true,
    uptime: process.uptime(),
    memory: process.memoryUsage()
  });
});

// ======================
// IA NEXUS
// ======================

app.post("/nexus", async (req, res) => {
  try {
    const message = req.body.message;

    if (!message) {
      return res.status(400).json({
        error: "Falta el mensaje"
      });
    }

    // RESPUESTA TEMPORAL DE IA
    // Después conectamos OpenAI real

    res.json({
      success: true,
      user: message,
      reply: `NEXUS recibió tu mensaje: ${message}`,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: "Error interno del servidor"
    });
  }
});

// ======================
// RUTA NO ENCONTRADA
// ======================

app.use((req, res) => {
  res.status(404).json({
    error: "Ruta no encontrada"
  });
});

// ======================
// INICIAR SERVIDOR
// ======================

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`🚀 NEXUS online en puerto ${PORT}`);
});

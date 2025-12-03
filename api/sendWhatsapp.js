import axios from "axios";

export default async function handler(req, res) {
  // --- CORS NECESARIO EN VERCEL ---
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Responder rápido al preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Solo permitir POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { number, message } = req.body;

    if (!number || !message) {
      return res.status(400).json({ error: "Faltan campos" });
    }

    const response = await axios.post(
      "https://api.evolutionmanager.app/message/sendText",
      { number, message },
      {
        headers: {
          Authorization: "Bearer 8AA0D006DB99-4CC7-94E7-64E35726F0DD",
          "Content-Type": "application/json",
        },
      }
    );

    return res.status(200).json({
      success: true,
      response: response.data,
    });

  } catch (err) {
    console.error("ERROR SERVIDOR:", err?.response?.data || err);
    return res.status(500).json({ error: "Error al enviar mensaje" });
  }
}

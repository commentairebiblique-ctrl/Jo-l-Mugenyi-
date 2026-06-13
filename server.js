import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("."));

function createReference(prefix) {
  return `${prefix}-${Date.now()}-${crypto.randomBytes(3).toString("hex").toUpperCase()}`;
}

function validatePaymentInput(req, res, next) {
  const { fullName, email, phone, amount } = req.body;

  if (!fullName || !email || !phone || !amount) {
    return res.status(400).json({
      success: false,
      message: "Nom, email, téléphone et montant sont obligatoires."
    });
  }

  next();
}

app.post("/api/payments/mpesa", validatePaymentInput, async (req, res) => {
  const reference = createReference("MPESA");

  const required = [
    "MPESA_BASE_URL",
    "MPESA_API_KEY",
    "MPESA_PUBLIC_KEY",
    "MPESA_SHORTCODE",
    "MPESA_CALLBACK_URL"
  ];

  const missing = required.filter((key) => !process.env[key]);

  if (missing.length) {
    return res.status(503).json({
      success: false,
      reference,
      message: `Configuration M-Pesa manquante : ${missing.join(", ")}. Ajoutez ces valeurs dans Render > Environment.`
    });
  }

  return res.json({
    success: true,
    mode: "TEST",
    provider: "M-Pesa Vodacom",
    reference,
    message: "Paiement M-Pesa simulé. Ajoutez l’appel API officiel pour activer le vrai paiement."
  });
});

app.post("/api/payments/airtel", validatePaymentInput, async (req, res) => {
  const reference = createReference("AIRTEL");

  const required = [
    "AIRTEL_BASE_URL",
    "AIRTEL_CLIENT_ID",
    "AIRTEL_CLIENT_SECRET",
    "AIRTEL_CALLBACK_URL"
  ];

  const missing = required.filter((key) => !process.env[key]);

  if (missing.length) {
    return res.status(503).json({
      success: false,
      reference,
      message: `Configuration Airtel manquante : ${missing.join(", ")}. Ajoutez ces valeurs dans Render > Environment.`
    });
  }

  return res.json({
    success: true,
    mode: "TEST",
    provider: "Airtel Money",
    reference,
    message: "Paiement Airtel Money simulé. Ajoutez l’appel API officiel pour activer le vrai paiement."
  });
});

app.post("/api/payments/donation", async (req, res) => {
  const { fullName, phone, amount, provider } = req.body;

  if (!fullName || !phone || !amount) {
    return res.status(400).json({
      success: false,
      message: "Nom, téléphone et montant du don sont obligatoires."
    });
  }

  const isAirtel = (provider || "").toLowerCase().includes("airtel");
  const reference = createReference(isAirtel ? "DON-AIRTEL" : "DON-MPESA");

  const required = isAirtel
    ? ["AIRTEL_BASE_URL", "AIRTEL_CLIENT_ID", "AIRTEL_CLIENT_SECRET", "AIRTEL_CALLBACK_URL"]
    : ["MPESA_BASE_URL", "MPESA_API_KEY", "MPESA_PUBLIC_KEY", "MPESA_SHORTCODE", "MPESA_CALLBACK_URL"];

  const missing = required.filter((key) => !process.env[key]);

  if (missing.length) {
    return res.status(503).json({
      success: false,
      reference,
      message: `Configuration ${isAirtel ? "Airtel" : "M-Pesa"} manquante : ${missing.join(", ")}. Ajoutez ces valeurs dans Render > Environment.`
    });
  }

  return res.json({
    success: true,
    mode: "TEST",
    provider: provider || "Mobile Money",
    reference,
    message: "Don simulé. Ajoutez l’appel API officiel pour activer le vrai paiement."
  });
});

app.post("/api/webhooks/mpesa", (req, res) => {
  console.log("Callback M-Pesa reçu :", req.body);
  res.json({ received: true });
});

app.post("/api/webhooks/airtel", (req, res) => {
  console.log("Callback Airtel reçu :", req.body);
  res.json({ received: true });
});

app.get("*", (req, res) => {
  res.sendFile("index.html", { root: "." });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Serveur Évangile Éternel lancé sur le port ${port}`);
});

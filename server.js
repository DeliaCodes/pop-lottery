const express = require("express");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 6000;

app.get("/api/*", (req, res) => {
  res.json({ ok: true });
});

app.get("/api/ticket", (req, res) => {
  res.json({ ok: true });
});

app.get("/api/ticket/:id", (req, res) => {
  res.json({ ok: true });
});

app.post("/api/ticket", (req, res) => {
  res.json({ ok: true });
});

app.put("/api/ticket/:id", (req, res) => {
  res.json({ ok: true });
});

app.put("/api/status/:id", (req, res) => {
  res.json({ ok: true });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

module.exports = { app };

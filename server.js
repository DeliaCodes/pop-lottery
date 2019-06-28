const express = require("express");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 6000;

// Endpoints
app.get("/", (req, res) => {
  res.json({ ok: true });
});

app.get("/api/*", (req, res) => {
  res.json({ ok: true });
});

// should return list of tickets created
app.get("/api/ticket", (req, res) => {
  res.json({ ok: true });
});

// gets an individual ticket
app.get("/api/ticket/:id", (req, res) => {
  res.json({ ok: true });
});

// creates a ticket
app.post("/api/ticket", (req, res) => {
  res.json({ ok: true });
});

// adds ticket lines (or amends?)
app.put("/api/ticket/:id", (req, res) => {
  res.json({ ok: true });
});

// retrieves status of ticket
app.put("/api/status/:id", (req, res) => {
  res.json({ ok: true });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

module.exports = { app };

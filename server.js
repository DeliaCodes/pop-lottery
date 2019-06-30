const express = require("express");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 6000;

const {
  generateTicket,
  amendTicket,
  checkStatus,
  serializeTicket
} = require("./tickets");

// Endpoints
app.get("/", (req, res) => {
  res.status(200);
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
  const newTicket = serializeTicket(generateTicket(3));
  res.json({ ok: true, ticket: newTicket });
});

// adds ticket lines (or amends?)
app.put("/api/ticket/:id", (req, res) => {
  //get body from URL?
  const amendedTicket = serializeTicket(amendTicket(req.body.id, 3));
  res.json({ ok: true, ticket: amendedTicket });
});

// retrieves status of ticket
app.put("/api/status/:id", (req, res) => {
  // gets ticket from storage and names myTicket
  const myTicket = checkStatus(req.body.id);
  res.json({ ok: true, ticket: myTicket });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

module.exports = { app };

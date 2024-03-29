const express = require("express");
const app = express();
require("dotenv").config();

app.use(express.json());

const PORT = process.env.PORT || 6000;

const {
  generateTicket,
  amendTicket,
  checkStatus,
  serializeTicket,
  getAllTickets,
  serializeAllTickets,
  getTicketFromStorage,
  serializeTicketWithChecked
} = require("./tickets");

// Endpoints

// Returns list of tickets created
app.get("/api/ticket", (req, res) => {
  let allTickets = serializeAllTickets(getAllTickets());
  res.json({ ok: true, tickets: allTickets });
});

// gets an individual ticket and passes on whether the ticket's status has been checked
app.get("/api/ticket/:id", (req, res) => {
  const myTicket = serializeTicketWithChecked(
    getTicketFromStorage(req.body.id)
  );
  res.json({ ok: true, ticket: myTicket });
});

// creates a ticket, returns ticket id as a string
app.post("/api/ticket", (req, res) => {
  const newTicket = serializeTicket(generateTicket(3));
  res.json({ ok: true, ticket: newTicket });
});

// adds three additional lines + outcomes to a ticket
app.put("/api/ticket/:id", (req, res) => {
  const amendedTicket = serializeTicket(amendTicket(req.body.id, 3));
  res.json({ ok: true, ticket: amendedTicket });
});

// retrieves status of ticket, sends the entire ticket to user
// once a ticket's status is checked, it cannot be amended
app.put("/api/status/:id", (req, res) => {
  const myTicket = checkStatus(req.body.id);
  res.json({ ok: true, ticket: myTicket });
});

let server;

function runServer() {
  return new Promise((resolve, reject) => {
    server = app
      .listen(PORT, () => {
        console.log(`Your app is listening on port ${PORT}`);
        resolve(server);
      })
      .on("error", err => {
        reject(err);
      });
  });
}

function closeServer() {
  return new Promise((resolve, reject) => {
    console.log("Closing server");
    server.close(err => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
}

module.exports = { app, runServer, closeServer };

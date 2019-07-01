/* 
Default Ticket Data Structure 
one ticket = {
    id: unique,
    lines: [[a, b, c]]
    outcomes: []
    editable: true
}
*/

const uniqid = require("uniqid");

// mock storage for tickets
let ticketStorage = {};

// mock storage operations
const saveToStorage = ticketObj => {
  let myId = ticketObj.id;
  return (ticketStorage[myId] = ticketObj);
};

const getTicketFromStorage = id => ticketStorage[id];

const getAllTickets = () => ticketStorage;

// line and outcome operations

const generateLine = () => {
  let line = [];
  const val1 = Math.floor(Math.random() * Math.floor(3));
  const val2 = Math.floor(Math.random() * Math.floor(3));
  const val3 = Math.floor(Math.random() * Math.floor(3));
  line.push(val1, val2, val3);
  return line;
};

const generateOutcome = line => {
  const sum = line.reduce((acc, val) => acc + val);
  if (sum === 2) {
    return 10;
  }

  if (line[0] === line[1] && line[1] === line[2]) {
    return 5;
  }
  if (line[0] !== line[1] && line[0] !== line[2]) {
    return 1;
  } else {
    return 0;
  }
};

// serialization methods

const serializeTicket = ticket => ticket.id;

const serializeAllTickets = tickets => Object.keys(tickets);

serializeTicketWithChecked = ticket => {
  if (ticket.editable === true) {
    return {
      id: ticket.id,
      checked: "This ticket has not been checked and can be amended"
    };
  } else {
    return {
      id: ticket.id,
      checked: "This ticket has already been checked and cannot be changed"
    };
  }
};

// ticket generation and manipulation methods

const generateTicket = number => {
  let newTicket = {
    id: uniqid(),
    lines: [],
    outcomes: [],
    editable: true
  };
  for (let i = number; i > 0; i--) {
    let newLine = generateLine();
    newTicket.outcomes.push(generateOutcome(newLine));
    newTicket.lines.push(newLine);
  }
  saveToStorage(newTicket);
  return newTicket;
};

const checkStatus = ticketID => {
  let ticket = getTicketFromStorage(ticketID);
  ticket.editable = false;
  saveToStorage(ticket);
  return ticket;
};

const amendTicket = (ticketID, numberOfLines) => {
  if (!getTicketFromStorage(ticketID)) {
    return "No ticket with that id exists, please try again";
  } else {
    let ticket = getTicketFromStorage(ticketID);
    if (ticket.editable === true) {
      for (let i = numberOfLines; i > 0; i--) {
        let newLine = generateLine();
        ticket.outcomes.push(generateOutcome(newLine));
        ticket.lines.push(newLine);
      }
      saveToStorage(ticket);
      return ticket;
    } else {
      return "Sorry, that ticket cannot be edited - it has already been checked";
    }
  }
};

module.exports = {
  generateTicket,
  generateOutcome,
  generateLine,
  amendTicket,
  checkStatus,
  serializeTicket,
  getAllTickets,
  serializeAllTickets,
  getTicketFromStorage,
  serializeTicketWithChecked
};

/* 
Ticket = {
    id: unique,
    lines: [[a, b, c]]
    outcomes: []
    editable: true
}
*/

const uniqid = require("uniqid");

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
  return newTicket;
};

const checkStatus = ticketID => {
  //get ticket from storage based on id
  ticket.editable = false;
  return ticket;
};

const amendTicket = (ticketID, numberOfLines) => {
  //get ticket from storage based on id
  for (let i = numberOfLines; i > 0; i--) {
    let newLine = generateLine();
    ticket.outcomes.push(generateOutcome(newLine));
    ticket.lines.push(newLine);
  }
  return ticket;
};

const serializeTicket = ticket => ticket.id;

module.exports = {
  generateTicket,
  generateOutput,
  generateLine,
  amendTicket,
  checkStatus,
  serializeTicket
};

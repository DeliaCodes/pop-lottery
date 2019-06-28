/* 
series of lines on each ticket
each line has 3 numbers - a 0, 1, or 2

NB: a = 1st number, etc

if  a + b + c = 2, line result = 10
if a, b, c are the same, line result = 5
if b and c !== a, line result = 1
else line result = 0

need: 
A) Generate ticket with N lines
B) Add N lines to a ticket
C) Sort lines into outcomes
D) once ticket status is checked, ticket is not editable

const generateLine = () => {
    let line = [];
   return line.push(Math.floor(Math.random * Math.floor(3)))
}

const generateTicket = (number) => {
    
}


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

module.exports = {
  generateTicket
};

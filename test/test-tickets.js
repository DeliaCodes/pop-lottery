const expect = require("chai").expect;

const {
  generateTicket,
  generateOutcome,
  checkStatus,
  generateLine,
  amendTicket,
  serializeTicket
} = require("../tickets");

describe("Ticket external methods", function() {
  it("generate ticket should return ticket id", function() {
    const newTicket = generateTicket(2);
    expect(newTicket.id).to.exist;
  });

  it("generateTicket should return ticket object", function() {
    const newTicket = generateTicket(3);
    expect(newTicket).to.be.an("object");
  });
  it("amendTicket should return ticket with new lines", function() {
    const originalTicket = generateTicket(3);
    const updatedTicket = amendTicket(originalTicket.id, 3);
    expect(updatedTicket.lines.length).to.have.lengthOf(6);
  });
  it("serializeTicket should only return ticket id", function() {
    const wholeTicket = generateTicket(3);
    const serializedTicket = serializeTicket(wholeTicket);
    expect(serializedTicket).to.be.a("string");
  });
});

//
describe("Ticket internal methods", function() {
  it("generateLine should create an array with three items", function() {
    const oneLine = generateLine();
    expect(oneLine).to.be.a("array");
    expect(oneLine).to.have.lengthOf(3);
  });
  it("generateOutcome should return a number from generateLine", function() {
    const oneLine = generateLine();
    const myOutcome = generateOutcome(oneLine);

    expect(myOutcome).to.be.a("number");
  });
  it("generateOutcome should return a 10", function() {
    const myWinningLine = [1, 0, 1];
    const myOutcome = generateOutcome(myWinningLine);
    expect(myOutcome).to.eq(10);
  });
  it("generateOutcome should return a 5", function() {
    const mySemiWinningLine = [2, 2, 2];
    const myOutcome = generateOutcome(mySemiWinningLine);
    expect(myOutcome).to.eq(5);
  });
  it("generateOutcome should return a 1", function() {
    const myOkayLine = [2, 0, 1];
    const myOutcome = generateOutcome(myOkayLine);
    expect(myOutcome).to.eq(1);
  });
  it("generateOutcome should return a 0", function() {
    const myLoosingLine = [2, 2, 1];
    const myOutcome = generateOutcome(myLoosingLine);
    expect(myOutcome).to.eq(0);
  });
});

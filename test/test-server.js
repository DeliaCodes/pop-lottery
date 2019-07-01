const chai = require("chai");
const chaiHttp = require("chai-http");

const { app, runServer, closeServer } = require("../server");

const expect = chai.expect;

chai.use(chaiHttp);

describe("", function() {
  before(function() {
    return runServer();
  });

  after(function() {
    return closeServer();
  });

  it("should respond with 200 at GET at root", function() {
    return chai
      .request(app)
      .get("/")
      .then(function(res) {
        expect(res).to.have.status(200);
      });
  });
  it("Post to ticket should return ticket id", function() {
    return chai
      .request(app)
      .post("/api/ticket")
      .then(function(res) {
        expect(res.body.ticket).to.be.a("string");
      });
  });

  it("Get to ticket should return ticket ids created", function() {
    return chai
      .request(app)
      .post("/api/ticket")
      .then(function(res) {
        return chai
          .request(app)
          .get("/api/ticket")
          .then(function(res) {
            expect(res.body.tickets).to.be.a("array");
            expect(res.body.tickets).to.have.lengthOf(2);
          });
      });
  });
  it("Get to ticket/:id returns if a ticket has been checked", function() {
    return chai
      .request(app)
      .post("/api/ticket")
      .then(function(res) {
        return chai
          .request(app)
          .get(`/api/ticket/${res.body.ticket}`)
          .send({ id: res.body.ticket })
          .then(function(res) {
            expect(res.body.ticket.checked).to.be.a("string");
            expect(res.body.ticket.checked).to.eq(
              "This ticket has not been checked and can be amended"
            );
          });
      });
  });
  it("Put to ticket/:id returns ticket id", function() {
    return chai
      .request(app)
      .post("/api/ticket")
      .then(function(res) {
        return chai
          .request(app)
          .put(`/api/ticket/${res.body.ticket}`)
          .send({ id: res.body.ticket })
          .then(function(res) {
            expect(res.body.ticket).to.be.a("string");
          });
      });
  });
  it("Put to status/:id returns ticket object with editable false", function() {
    return chai
      .request(app)
      .post("/api/ticket")
      .then(function(res) {
        return chai
          .request(app)
          .put(`/api/status/${res.body.ticket}`)
          .send({ id: res.body.ticket })
          .then(function(res) {
            expect(res.body.ticket.editable).to.be.false;
            expect(res.body.ticket.lines)
              .to.be.an("array")
              .that.have.lengthOf(3);
            expect(res.body.ticket.outcomes)
              .to.be.an("array")
              .that.have.lengthOf(3);
            expect(res.body.ticket.id).to.be.a("string");
          });
      });
  });
  // double check these tests below
  // get /api/ticket should return tickets created
  // get /api/ticket/:id gets a ticket, returns editable status
  // put /api/ticket/:id returns ticket id && using get amends ticket
  // put /api/status/:id checks ticket and returns the whole thing
});

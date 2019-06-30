"use strict";

const chai = require("chai");
const chaiHttp = require("chai-http");

// const { app } = require("./server");

const expect = chai.expect;

chai.use(chaiHttp);

// test get / should return 200
// get /api/ticket should return tickets
// get /api/ticket/:id gets a ticket, returns editable status
// post /api/ticket returns a new ticket id
// put /api/ticket/:id returns ticket id && using get amends ticket
// put /api/status/:id checks ticket and returns the whole thing
//

describe("should respond to get", function() {
  // expect(result).to
});

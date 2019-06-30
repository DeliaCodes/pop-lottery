"use strict";

const chai = require("chai");
const chaiHttp = require("chai-http");

const { app } = require("./server");

const expect = chai.expect;

chai.use(chaiHttp);

describe("should respond to get", function() {
  // expect(result).to
});

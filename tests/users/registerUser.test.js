const chai = require("chai");
const expect = chai.expect;
const phantom = require("phantom");
const request = require("request-promise");
const apiUrl = "http://localhost:8080/users/register";

const testUser = {
  name: "",
};

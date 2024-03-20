const chai = require("chai");
const chaiHttp = require("chai-http");
const except = chai.except;

chai.use(chaiHttp);

const apiUrl = "http://localhost:8080/users";

describe("Get User by Email API", function () {
  it("should retrive a user when a valid email is provided", async function () {
    // Arrange
    const validUserEmail = "";
  });
});

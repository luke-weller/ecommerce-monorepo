const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;

chai.use(chaiHttp);

const apiUrl = "http://localhost:8080/auth/login";

const userData = {
  email: "example@email.com",
  password: "password123",
};

describe("Login API", function () {
  let response;

  beforeEach(async function () {
    response = await chai.request(apiUrl).post("/").send(userData);
  });

  it("should return a 200 response after successfully logging in", function () {
    // Assert:
    expect(response).to.have.status(200);
    expect(response).to.be.an("object");
    expect(response.body).to.have.all.keys(["message", "user"]);
  });

  it("response should contain the same email address provided", function () {
    // Assert:
    expect(response.body.user.email).to.equal(userData.email);
    expect(response.body.user.email).to.be.a("string");
    expect(response.body.user.email).to.not.be.empty;
  });

  it("response should contain a first name for the user", function () {
    // Assert:
    expect(response.body.user.first_name).to.not.be.undefined;
    expect(response.body.user.first_name).to.be.a("string");
    expect(response.body.user.first_name).to.not.be.empty;
  });

  it("response should contain a last name for the user", function () {
    // Assert:
    expect(response.body.user.last_name).to.not.be.undefined;
    expect(response.body.user.last_name).to.be.a("string");
    expect(response.body.user.last_name).to.not.be.empty;
  });
});

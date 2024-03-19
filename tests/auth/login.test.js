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

    expect(response.body.user.email).to.equal(userData.email);
    expect(response.body.user.email).to.be.a("string");
    expect(response.body.user.email).to.not.be.empty;

    expect(response.body.user.first_name).to.not.be.undefined;
    expect(response.body.user.first_name).to.be.a("string");
    expect(response.body.user.first_name).to.not.be.empty;

    expect(response.body.user.last_name).to.not.be.undefined;
    expect(response.body.user.last_name).to.be.a("string");
    expect(response.body.user.last_name).to.not.be.empty;
  });

  it("should return 401 for invalid email", async function () {
    // Arrange:
    const invalidEmailData = {
      email: "invalid_email",
      password: "password123",
    };

    // Act:
    const response = await chai
      .request(apiUrl)
      .post("/")
      .send(invalidEmailData);

    // Assert:
    expect(response).to.have.status(401);
    expect(response.body.error).to.equal("Incorrect email or password");
  });

  it("should return 401 for invalid password but valid email", async function () {
    // Arrange:
    const invalidEmailData = {
      email: "example@email.com",
      password: "wrong-password",
    };

    // Act:
    const response = await chai
      .request(apiUrl)
      .post("/")
      .send(invalidEmailData);

    // Assert:
    expect(response).to.have.status(401);
    expect(response.body.error).to.equal("Incorrect email or password");
  });
});

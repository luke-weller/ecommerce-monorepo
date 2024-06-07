const chai = require("chai");
const chaiHttp = require("chai-http");
const { userSetup, userTeardown } = require("../utils/setup/userSetup");
const bcrypt = require("bcrypt");
const expect = chai.expect;
const jwt = require("jsonwebtoken");

chai.use(chaiHttp);

const loginApiUrl = "http://localhost:8080/auth/login";

describe("Login API", function () {
  let createdUser;

  before(async function () {
    createdUser = await userSetup();
  });

  after(async function () {
    try {
      await userTeardown(createdUser.newUser.id);
    } catch (error) {
      console.error("Error occurred during user teardown:", error);
    }
  });

  it("should return a 200 response after successfully logging in", async function () {
    // Act:
    const testLoginDetails = {
      email: createdUser.newUser.email,
      password: "test-password",
    };
    const response = await chai
      .request(loginApiUrl)
      .post("/")
      .send(testLoginDetails);

    // Assert:
    expect(response).to.have.status(200);
    expect(response.body)
      .to.have.property("message")
      .to.equal("Login successful");
    expect(response.body).to.have.property("user").to.be.an("object");
    expect(response.body).to.have.property("token").to.be.a("string");

    const { user, token } = response.body;

    const decodedToken = jwt.decode(token);
    expect(decodedToken.payload).to.have.property("userId").to.equal(user.id);
    expect(decodedToken.payload).to.have.property("email").to.equal(user.email);

    expect(user).to.have.all.keys([
      "id",
      "email",
      "first_name",
      "last_name",
      "created_at",
      "password",
    ]);
    expect(user.email).to.equal(createdUser.newUser.email);
    expect(user.email).to.be.a("string").that.is.not.empty;
    expect(user.first_name).to.be.a("string").that.is.not.empty;
    expect(user.last_name).to.be.a("string").that.is.not.empty;

    expect(token).to.be.a("string").that.is.not.empty;
  });

  // it("should return 401 for invalid email", async function () {
  //   // Arrange:
  //   const invalidEmailData = {
  //     email: "invalid_email",
  //     password: "password123",
  //   };

  //   // Act:
  //   const response = await chai
  //     .request(loginApiUrl)
  //     .post("/")
  //     .send(invalidEmailData);

  //   // Assert:
  //   expect(response).to.have.status(401);
  //   expect(response.body.error).to.equal("Incorrect email or password");
  // });
});

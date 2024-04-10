const { userSetup, userTeardown } = require("../utils/setup/userSetup");
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;

chai.use(chaiHttp);

const apiUrl = "http://localhost:8080/users";

describe("Get User by Email API", function () {
  let createdUser;

  before(async function () {
    createdUser = await userSetup();
  });

  after(async function () {
    await userTeardown(createdUser.newUser.id);
  });

  it("should retrive a user when a valid email is provided", async function () {
    // Act
    const response = await chai
      .request(apiUrl)
      .get(`/${createdUser.newUser.email}`);

    // Assert
    expect(response).to.have.status(200);
    expect(response.body)
      .to.have.property("email")
      .equal(createdUser.newUser.email);
  });
});

const { userTeardown } = require("../utils/setup/userSetup");
const mockUserData = require("../utils/factories/userFactory");
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;

chai.use(chaiHttp);

const apiUrl = "http://localhost:8080/users/register";

describe("Register user API", function () {
  let createdUserId;
  let mockUser;

  after(async function () {
    await userTeardown(createdUserId);
  });

  it("should register a new user and return it in the response", async function () {
    // Act:
    mockUser = mockUserData();
    const response = await chai.request(apiUrl).post("/").send(mockUser);
    createdUserId = response.body.newUser.id;

    // Assert:
    expect(response).to.have.status(201);
    expect(response.body).to.be.an("object");
    expect(response.body.newUser).to.have.all.keys([
      "id",
      "email",
      "password",
      "first_name",
      "last_name",
      "created_at",
    ]);
    expect(response.body.newUser.email).to.equal(mockUser.email);
    expect(response.body.newUser.first_name).to.equal(mockUser.first_name);
    expect(response.body.newUser.last_name).to.equal(mockUser.last_name);
    expect(response.body.token).to.be.a("string");
  });

  it("should not register a user with an email that already exists", async function () {
    // Act:
    const response = await chai.request(apiUrl).post("/").send(mockUser);

    // Assert:
    expect(response).to.have.status(400);
    expect(response.body).to.be.an("object");
    expect(response.body).to.have.property("error");
    expect(response.body.error).to.equal("User with this email already exists");
  });
});

const generateUser = require("../utils/factories/userFactory");
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;

chai.use(chaiHttp);

const loginApiUrl = "http://localhost:8080/auth/login";
const userApiUrl = "http://localhost:8080/users/";

describe("Login API", function () {
  let createdUserId;
  let response;
  let userData;

  before(async function () {
    userData = await generateUser();
    const createUserResponse = await chai
      .request(userApiUrl)
      .post("/register")
      .send(userData);
    createdUserId = createUserResponse.body.id;
  });

  after(async function () {
    if (createdUserId) {
      try {
        const deleteUserResponse = await chai
          .request(userApiUrl)
          .delete(`/${createdUserId}`);
      } catch (error) {
        console.error("Error deleting created user:", error.message);
      }
    }
  });

  it("should return a 200 response after successfully logging in", async function () {
    // Act:
    response = await chai.request(loginApiUrl).post("/").send(userData);

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
      .request(loginApiUrl)
      .post("/")
      .send(invalidEmailData);

    // Assert:
    expect(response).to.have.status(401);
    expect(response.body.error).to.equal("Incorrect email or password");
  });
});

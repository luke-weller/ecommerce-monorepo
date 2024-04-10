const mockUserData = require("../utils/factories/userFactory");
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;

chai.use(chaiHttp);

const loginApiUrl = "http://localhost:8080/auth/login";
const userApiUrl = "http://localhost:8080/users/";

describe("Login API", function () {
  let createdUserId;
  let userData;

  before(async function () {
    userData = mockUserData();
    const createUserResponse = await chai
      .request(userApiUrl)
      .post("/register")
      .send(userData);
    createdUserId = createUserResponse.body.id;
  });

  after(async function () {
    if (createdUserId) {
      try {
        await chai.request(userApiUrl).delete(`/${createdUserId}`);
      } catch (error) {
        console.error("Error deleting created user:", error.message);
      }
    }
  });

  it("should return a 200 response after successfully logging in", async function () {
    // Act:
    const response = await chai.request(loginApiUrl).post("/").send(userData);

    // Assert:
    expect(response).to.have.status(200);
    expect(response.body)
      .to.have.property("message")
      .to.equal("Login successful");
    expect(response.body).to.have.property("user").to.be.an("object");

    const { user, token } = response.body;

    expect(user).to.have.all.keys([
      "id",
      "email",
      "first_name",
      "last_name",
      "created_at",
      "password",
    ]);
    expect(user.email).to.equal(userData.email);
    expect(user.email).to.be.a("string").that.is.not.empty;
    expect(user.first_name).to.be.a("string").that.is.not.empty;
    expect(user.last_name).to.be.a("string").that.is.not.empty;

    expect(token).to.be.a("string").that.is.not.empty;
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

const generateUser = require("../utils/factories/userFactory");
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;

chai.use(chaiHttp);

const apiUrl = "http://localhost:8080/users/register";
const userApiUrl = "http://localhost:8080/users/";

describe("Register user API", function () {
  let createdUserId;
  let userData;

  before(async function () {
    userData = await generateUser();
  });

  after(async function () {
    if (createdUserId) {
      try {
        const deleteUserResponse = await chai
          .request(userApiUrl)
          .delete(`/${createdUserId}`);
        console.log(deleteUserResponse.statusCode);
      } catch (error) {
        console.error("Error deleting created user:", error.message);
      }
    }
  });

  it("should register a new user and return it in the response", async function () {
    // Act:
    const response = await chai.request(apiUrl).post("/").send(userData);

    createdUserId = response.body.id;

    // Assert:
    expect(response).to.have.status(201);
    expect(response.body).to.be.an("object");
    expect(response.body).to.have.all.keys([
      "id",
      "email",
      "password",
      "first_name",
      "last_name",
      "created_at",
    ]);
    expect(response.body.email).to.equal(userData.email);
    expect(response.body.first_name).to.equal(userData.first_name);
    expect(response.body.last_name).to.equal(userData.last_name);
  });
});

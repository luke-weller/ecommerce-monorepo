const generateUser = require("../utils/factories/userFactory");
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;

chai.use(chaiHttp);

const apiUrl = "http://localhost:8080/users";

describe("Get User by Email API", function () {
  let createdUserEmail;
  let createdUserId;

  before(async function () {
    const userData = await generateUser();
    const response = await chai
      .request(apiUrl)
      .post("/register")
      .send(userData);
    createdUserEmail = response.body.email;
    createdUserId = response.body.id;
  });

  after(async function () {
    if (createdUserId) {
      try {
        await chai.request(apiUrl).delete(`/${createdUserId}`);
      } catch (error) {
        console.error("Error deleting created user:", error.message);
      }
    }
  });

  it("should retrive a user when a valid email is provided", async function () {
    // Act
    const response = await chai.request(apiUrl).get(`/${createdUserEmail}`);

    // Assert
    expect(response).to.have.status(200);
    expect(response.body).to.have.property("email").equal(createdUserEmail);
  });
});

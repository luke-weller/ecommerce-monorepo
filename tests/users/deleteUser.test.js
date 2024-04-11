const { userSetup } = require("../utils/setup/userSetup");
const { categoryTeardown } = require("../utils/setup/categorySetup");
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;

chai.use(chaiHttp);

const apiUrl = "http://localhost:8080/users";

describe("Delete User API", function () {
  let createdUser;

  before(async function () {
    createdUser = await userSetup();
  });

  it("should delete an existing user and return a 202 status", async function () {
    // Act:
    const response = await chai
      .request(apiUrl)
      .delete(`/${createdUser.newUser.id}`);

    // Assert:
    expect(response).to.have.status(202);

    try {
      const getUserResponse = await chai
        .request(apiUrl)
        .get(`/${createdUser.newUser.id}`);
      expect(getUserResponse).to.have.status(404);
    } catch (error) {
      expect(error.response).to.have.status(404);
    }
  });
});

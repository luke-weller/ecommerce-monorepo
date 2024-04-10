const { create } = require("phantom");
const mockUserData = require("../utils/factories/userFactory");
const { userSetup, userTeardown } = require("../utils/setup/userSetup");
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;

chai.use(chaiHttp);

const apiUrl = "http://localhost:8080/users";

describe("Update Users API", function () {
  let createdUser;

  before(async function () {
    createdUser = await userSetup();
  });

  after(async function () {
    await userTeardown(createdUser);
  });

  it("should update an existing user and return the updated data", async function () {
    // Arrange:
    const updatedUserData = mockUserData();

    // Act:
    const response = await chai
      .request(apiUrl)
      .put(`/${createdUser.newUser.id}`)
      .send(updatedUserData);

    // Assert:
    expect(response).to.have.status(200);
    expect(response.body).to.be.an("object");
    expect(response.body).to.have.all.keys([
      "id",
      "email",
      "password",
      "first_name",
      "last_name",
      "created_at",
    ]);
    expect(response.body.email).to.equal(updatedUserData.email);
    expect(response.body.first_name).to.equal(updatedUserData.first_name);
    expect(response.body.last_name).to.equal(updatedUserData.last_name);
  });
});

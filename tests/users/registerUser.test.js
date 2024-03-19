const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;

chai.use(chaiHttp);

const apiUrl = "http://localhost:8080/users/register";
const userData = {
  email: "example6@email.com",
  first_name: "test first",
  last_name: "test last",
  password: "password123",
};

describe("Register user API", function () {
  it("should register a new user and return it in the response", async function () {
    // Act:
    const response = await chai.request(apiUrl).post("/").send(userData);

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

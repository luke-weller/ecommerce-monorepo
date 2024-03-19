const chai = require("chai");
const expect = chai.expect;
const phantom = require("phantom");
const request = require("request-promise");
const apiUrl = "http://localhost:8080/users/register";
const userData = {
  email: "example6@email.com",
  first_name: "test first",
  last_name: "test last",
  password: "password123",
};

describe("Register user API", function () {
  let instance, page;

  before(async function () {
    instance = await phantom.create();
    page = await instance.createPage();
  });

  after(async function () {
    await page.close();
    await instance.exit();
  });

  it("should register a new user and return it in the response", async function () {
    // Arrange:
    const options = {
      method: "POST",
      uri: apiUrl,
      body: userData,
      json: true,
    };

    // Act:
    const response = await request(options);

    // Assert:
    expect(response).to.be.an("object");
    expect(response).to.have.all.keys([
      "id",
      "email",
      "password",
      "first_name",
      "last_name",
      "created_at",
    ]);
    expect(response.email).to.equal(userData.email);
    expect(response.first_name).to.equal(userData.first_name);
    expect(response.last_name).to.equal(userData.last_name);
  });
});

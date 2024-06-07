const {
  categorySetup,
  categoryTeardown,
} = require("../utils/setup/categorySetup");
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;

chai.use(chaiHttp);

const apiUrl = "http://localhost:8080/category";

describe("Get all the categories API", function () {
  let createdCategory;

  before(async function () {
    createdCategory = await categorySetup();
  });

  after(async function () {
    await categoryTeardown(createdCategory.id);
  });

  it("should retrieve all categories with the expected format", async function () {
    // Act:
    const response = await chai.request(apiUrl).get("/");

    // Assert:
    expect(response).to.have.status(200);
    expect(response).to.be.an("object");
    expect(response.body).to.be.an("array");

    response.body.forEach((category) => {
      expect(category).to.have.all.keys("id", "name", "description");
      expect(category.id).to.be.a("string").that.is.not.empty;
      expect(category.name).to.be.a("string").that.is.not.empty;
      expect(category.description).to.be.a("string").that.is.not.empty;
    });
  });

  it("should handle server errors gracefully", async function () {
    // Arrange:
    const invalidApiUrl = `${apiUrl}/invalid-endpoint`;

    // Act:
    try {
      await chai.request(invalidApiUrl).get("/");
    } catch (error) {
      // Assert:
      expect(error).to.have.status(404);
    }
  });
});

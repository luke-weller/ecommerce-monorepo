const mockCategoryData = require("../utils/factories/categoryFactory");
const {
  categorySetup,
  categoryTeardown,
} = require("../utils/setup/categorySetup");
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;

chai.use(chaiHttp);

const apiUrl = "http://localhost:8080/category";

describe("Update Category API", function () {
  let createdCategory;

  before(async function () {
    createdCategory = await categorySetup();
  });

  after(async function () {
    await categoryTeardown(createdCategory);
  });

  it("should update an existing category and return the updated data", async function () {
    // Arrange:
    const updatedCategoryData = mockCategoryData();

    // Act:
    const response = await chai
      .request(apiUrl)
      .put(`/${createdCategory.id}`)
      .send(updatedCategoryData);

    // Assert:
    expect(response).to.have.status(200);
    expect(response.body).to.be.an("object");
    expect(response.body).to.have.all.keys(["id", "name", "description"]);
    expect(response.body.name).to.equal(updatedCategoryData.name);
    expect(response.body.description).to.equal(updatedCategoryData.description);
  });
});

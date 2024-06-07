const { categorySetup } = require("../utils/setup/categorySetup");
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;

chai.use(chaiHttp);

const apiUrl = "http://localhost:8080/category";

describe("Delete Category API", function () {
  let createdCategory;

  before(async function () {
    createdCategory = await categorySetup();
  });

  it("should delete an existing category and return a 202 status", async function () {
    // Act:
    const response = await chai
      .request(apiUrl)
      .delete(`/${createdCategory.id}`);

    // Assert:
    expect(response).to.have.status(202);

    try {
      const getCategoryResponse = await chai
        .request(apiUrl)
        .get(`/${createdCategory.id}`);
      expect(getCategoryResponse).to.have.status(404);
    } catch (error) {
      expect(error.response).to.have.status(404);
    }
  });
});

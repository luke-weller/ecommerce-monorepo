const { productSetup } = require("../utils/setup/productSetup");
const { categoryTeardown } = require("../utils/setup/categorySetup");
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;

chai.use(chaiHttp);

const apiUrl = "http://localhost:8080/products";

describe("Delete Product API", function () {
  let createdProduct;

  before(async function () {
    createdProduct = await productSetup();
  });

  after(async function () {
    await categoryTeardown(createdProduct.category_id);
  });

  it("should delete an existing product and return a 202 status", async function () {
    // Act:
    const response = await chai.request(apiUrl).delete(`/${createdProduct.id}`);

    // Assert:
    expect(response).to.have.status(202);

    try {
      const getProductResponse = await chai
        .request(apiUrl)
        .get(`/${createdProduct.id}`);
      expect(getProductResponse).to.have.status(404);
    } catch (error) {
      expect(error.response).to.have.status(404);
    }
  });
});

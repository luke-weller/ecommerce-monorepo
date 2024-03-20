const generateProduct = require("../utils/factories/productFactory");
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;

chai.use(chaiHttp);

const apiUrl = "http://localhost:8080/products";

describe("Delete Product API", function () {
  let createdProductId;

  before(async function () {
    const productData = await generateProduct();
    const response = await chai.request(apiUrl).post("/").send(productData);
    createdProductId = response.body.id;
  });

  it("should delete an existing product and return a 204 status", async function () {
    // Act:
    const response = await chai.request(apiUrl).delete(`/${createdProductId}`);

    // Assert:
    expect(response).to.have.status(204);

    try {
      const getProductResponse = await chai
        .request(apiUrl)
        .get(`/${createdProductId}`);
      expect(getProductResponse).to.have.status(404);
    } catch (error) {
      expect(error.response).to.have.status(404);
    }
  });
});

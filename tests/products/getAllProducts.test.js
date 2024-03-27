const {
  productSetup,
  productTeardown,
} = require("../utils/setup/productSetup");
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;

chai.use(chaiHttp);

const apiUrl = "http://localhost:8080/products";

describe("Get all the products API", function () {
  let createdProduct;

  before(async function () {
    createdProduct = await productSetup();
  });

  after(async function () {
    await productTeardown(createdProduct);
  });

  it("should retrieve all products with the expected format", async function () {
    // Act:
    const response = await chai.request(apiUrl).get("/");

    // Assert:
    expect(response).to.have.status(200);
    expect(response).to.be.an("object");
    expect(response.body).to.be.an("array");

    response.body.forEach((product) => {
      expect(product).to.have.all.keys(
        "id",
        "name",
        "price",
        "description",
        "category_id",
        "stock_quantity"
      );
      expect(product.id).to.be.a("string").that.is.not.empty;
      expect(product.name).to.be.a("string").that.is.not.empty;
      expect(product.price).to.be.a("string").that.is.not.empty;
      expect(product.description).to.be.a("string").that.is.not.empty;
    });
  });

  it("should handle server errors gracefully", async function () {
    // Arrange:
    const invalidApiUrl = "http://localhost:8080/invalid-endpoint";

    // Act:
    try {
      await chai.request(invalidApiUrl).get("/");
    } catch (error) {
      // Assert:
      expect(error).to.have.status(404);
    }
  });
});

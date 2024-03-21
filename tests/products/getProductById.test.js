const generateProduct = require("../utils/factories/productFactory");
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;

chai.use(chaiHttp);

const apiUrl = "http://localhost:8080/products";

describe("Get Product by ID API", function () {
  let createdProductId;

  before(async function () {
    const productData = await generateProduct();
    const response = await chai.request(apiUrl).post("/").send(productData);
    createdProductId = response.body.id;
  });

  after(async function () {
    if (createdProductId) {
      try {
        await chai.request(apiUrl).delete(`/${createdProductId}`);
      } catch (error) {
        console.error("Error deleting created product:", error.message);
      }
    }
  });

  it("should retrieve a product when a valid ID is provided", async function () {
    // Act:
    const response = await chai.request(apiUrl).get(`/${createdProductId}`);

    // Assert:
    expect(response).to.have.status(200);
    expect(response.body).to.have.property("id").equal(createdProductId);
    expect(response.body).to.have.property("name").to.be.a("string");
  });

  it("should return a 'Product not found' error when an invalid ID is provided", async function () {
    // Arrange:
    const invalidProductId = "22222222-2222-2222-2222-222222222225";

    // Act:
    const response = await chai.request(apiUrl).get(`/${invalidProductId}`);

    // Assert:
    expect(response).to.have.status(404);
    expect(response.body).to.have.property("error").equal("Product not found");
  });

  it("should return an 'Internal server error' when an error occurs on the server", async function () {
    // Arrange:
    const errorProductId = "123";

    // Act:
    const response = await chai.request(apiUrl).get(`/${errorProductId}`);

    // Assert:
    expect(response).to.have.status(500);
    expect(response.body)
      .to.have.property("error")
      .equal("Internal server error");
  });
});

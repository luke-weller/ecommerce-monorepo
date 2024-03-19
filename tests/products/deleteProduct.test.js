const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;

chai.use(chaiHttp);

const apiUrl = "http://localhost:8080/products";
const productData = {
  name: "Test Product",
  price: "19.99",
  description: "A test product",
  category_id: "fa62fb43-6e09-4485-b8d3-df4b7ce3353c",
  stock_quantity: 10,
};

describe("Delete Product API", function () {
  let createdProductId;

  before(async function () {
    // Create a product before each test
    const response = await chai.request(apiUrl).post("/").send(productData);
    createdProductId = response.body.id;
  });

  it("should delete an existing product and return a 204 status", async function () {
    // Act:
    const response = await chai.request(apiUrl).delete(`/${createdProductId}`);

    // Assert:
    expect(response).to.have.status(204);

    // Verify that the product is deleted by attempting to fetch it
    try {
      const getProductResponse = await chai
        .request(apiUrl)
        .get(`/${createdProductId}`);
      expect(getProductResponse).to.have.status(404); // Expecting 404 as the product should not exist
    } catch (error) {
      // If the product fetch fails with a 404, it indicates successful deletion
      expect(error.response).to.have.status(404);
    }
  });
});

const generateProduct = require("../utils/factories/productFactory");
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;

chai.use(chaiHttp);

const apiUrl = "http://localhost:8080/products";

describe("Update Product API", function () {
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

  it("should update an existing product and return the updated data", async function () {
    // Arrange:
    const updatedProductData = await generateProduct();

    // Act:
    const response = await chai
      .request(apiUrl)
      .put(`/${createdProductId}`)
      .send(updatedProductData);

    // Assert:
    expect(response).to.have.status(200);
    expect(response.body).to.be.an("object");
    expect(response.body).to.have.all.keys([
      "id",
      "name",
      "price",
      "description",
      "category_id",
      "stock_quantity",
    ]);
    expect(response.body.name).to.equal(updatedProductData.name);
    expect(response.body.price).to.equal(updatedProductData.price);
    expect(response.body.description).to.equal(updatedProductData.description);
    expect(response.body.category_id).to.equal(updatedProductData.category_id);
    expect(response.body.stock_quantity).to.equal(
      updatedProductData.stock_quantity
    );
  });
});

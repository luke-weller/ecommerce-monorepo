const mockProductData = require("../utils/factories/productFactory");
const {
  productSetup,
  productTeardown,
} = require("../utils/setup/productSetup");
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;

chai.use(chaiHttp);

const apiUrl = "http://localhost:8080/products";

describe("Update Product API", function () {
  let createdProduct;

  before(async function () {
    createdProduct = await productSetup();
  });

  after(async function () {
    await productTeardown(createdProduct);
  });

  it("should update an existing product and return the updated data", async function () {
    // Arrange:
    const updatedProductData = await mockProductData();

    // Act:
    const response = await chai
      .request(apiUrl)
      .put(`/${createdProduct.id}`)
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
    expect(response.body.category_id).to.equal(response.body.category_id);
    expect(response.body.stock_quantity).to.equal(
      updatedProductData.stock_quantity
    );
  });
});

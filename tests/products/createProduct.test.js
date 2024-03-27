const mockProductData = require("../utils/factories/productFactory");
const { productTeardown } = require("../utils/setup/productSetup");

const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;

chai.use(chaiHttp);

const apiUrl = "http://localhost:8080/products";

describe("Create Product API", function () {
  let createdProductId;

  after(async function () {
    await productTeardown(createdProductId);
  });

  it("should create a new product and return it in the response", async function () {
    // Act:
    const productData = await mockProductData();
    const response = await chai.request(apiUrl).post("/").send(productData);

    createdProductId = response.body.id;

    // Assert:
    expect(response).to.have.status(201);
    expect(response.body).to.be.an("object");
    expect(response.body).to.have.all.keys([
      "id",
      "name",
      "price",
      "description",
      "category_id",
      "stock_quantity",
    ]);
    expect(response.body.name).to.equal(productData.name);
    expect(response.body.price).to.equal(productData.price);
    expect(response.body.description).to.equal(productData.description);
    expect(response.body.category_id).to.equal(productData.category_id);
    expect(response.body.stock_quantity).to.equal(productData.stock_quantity);
  });
});

const chai = require("chai");
const expect = chai.expect;
const phantom = require("phantom");
const request = require("request-promise");
const apiUrl = "http://localhost:8080/products";

const productData = {
  name: "Test Product",
  price: "19.99",
  description: "A test product",
  category_id: "fa62fb43-6e09-4485-b8d3-df4b7ce3353c",
  stock_quantity: 10,
};

describe("Create Product API", function () {
  let instance, page;
  let createdProductId;

  before(async function () {
    instance = await phantom.create();
    page = await instance.createPage();
  });

  after(async function () {
    if (createdProductId) {
      const deleteUrl = `${apiUrl}/${createdProductId}`;
      await request({ method: "DELETE", uri: deleteUrl });
    }

    await page.close();
    await instance.exit();
  });

  it("should create a new product and return it in the response", async function () {
    // Arrange:
    const options = {
      method: "POST",
      uri: apiUrl,
      body: productData,
      json: true,
    };

    // Act:
    const response = await request(options);

    createdProductId = response.id;

    // Assert:
    expect(response).to.be.an("object");
    expect(response).to.have.all.keys([
      "id",
      "name",
      "price",
      "description",
      "category_id",
      "stock_quantity",
    ]);
    expect(response.name).to.equal(productData.name);
    expect(response.price).to.equal(productData.price);
    expect(response.description).to.equal(productData.description);
    expect(response.category_id).to.equal(productData.category_id);
    expect(response.stock_quantity).to.equal(productData.stock_quantity);
  });
});

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

describe("Delete Product API", function () {
  let instance, page;
  let createdProductId;

  before(async function () {
    instance = await phantom.create();
    page = await instance.createPage();

    const createOptions = {
      method: "POST",
      uri: apiUrl,
      body: productData,
      json: true,
    };
    const response = await request(createOptions);
    createdProductId = response.id;
  });

  after(async function () {
    await page.close();
    await instance.exit();
  });

  it("should delete an existing product and return a 204 status", async function () {
    // Arrange:
    const deleteOptions = {
      method: "DELETE",
      uri: `${apiUrl}/${createdProductId}`,
      resolveWithFullResponse: true,
    };

    // Act:
    const response = await request(deleteOptions);

    // Assert:
    expect(response.statusCode).to.equal(204);

    const getProductOptions = {
      method: "GET",
      uri: `${apiUrl}/${createdProductId}`,
    };

    try {
      await request(getProductOptions);
    } catch (error) {
      expect(error.statusCode).to.equal(404);
    }
  });
});

const chai = require("chai");
const expect = chai.expect;
const phantom = require("phantom");
const request = require("request-promise");
const apiUrl = "http://localhost:8080/products";
const productData = {
  name: "Test Product",
  price: "19.99",
  description: "A test product",
  category_id: "550e8400-e29b-41d4-a716-446655440000",
  stock_quantity: 10,
};

describe("Update Product API", function () {
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
    if (createdProductId) {
      const deleteUrl = `${apiUrl}/${createdProductId}`;
      await request({ method: "DELETE", uri: deleteUrl });
    }

    await page.close();
    await instance.exit();
  });

  it("should update an existing product and return the updated data", async function () {
    // Arrange:
    const updatedProductData = {
      name: "Updated Product Name",
      price: "29.99",
      description: "Updated product description",
      category_id: "550e8400-e29b-41d4-a716-446655440000",
      stock_quantity: 20,
    };

    const updateOptions = {
      method: "PUT",
      uri: `${apiUrl}/${createdProductId}`,
      body: updatedProductData,
      json: true,
    };

    // Act:
    const response = await request(updateOptions);

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
    expect(response.name).to.equal(updatedProductData.name);
    expect(response.price).to.equal(updatedProductData.price);
    expect(response.description).to.equal(updatedProductData.description);
    expect(response.category_id).to.equal(updatedProductData.category_id);
    expect(response.stock_quantity).to.equal(updatedProductData.stock_quantity);
  });
});

const chai = require("chai");
const expect = chai.expect;
const phantom = require("phantom");

const apiUrl = "http://localhost:8080/products";

describe("Get all the products API", function () {
  let instance, page;

  before(async function () {
    instance = await phantom.create();
    page = await instance.createPage();
  });

  after(async function () {
    await page.close();
    await instance.exit();
  });

  it("should retrieve all products with the expected format", async function () {
    // Arrange:
    const status = await page.open(apiUrl);

    // Act:
    expect(status).to.equal("success");

    const content = await page.property("content");
    const cleanedContent = content.replace(/<[^>]*>/g, "");
    const responseData = JSON.parse(cleanedContent);
    const expectedKeys = [
      "id",
      "name",
      "price",
      "description",
      "category_id",
      "stock_quantity",
    ];

    // Assert:
    responseData.forEach((product) => {
      expect(product).to.have.all.keys(expectedKeys);
      expect(product.id).to.be.a("string").that.is.not.empty;
      expect(product.name).to.be.a("string").that.is.not.empty;
      expect(product.price).to.be.a("string").that.is.not.empty;
      expect(product.description).to.be.a("string").that.is.not.empty;
    });
  });
});

const chai = require("chai");
const expect = chai.expect;
const phantom = require("phantom");

const apiUrl = "http://localhost:8080/products";

describe("Get Product by ID API", function () {
  let instance, page;

  before(async function () {
    instance = await phantom.create();
    page = await instance.createPage();
  });

  after(async function () {
    await page.close();
    await instance.exit();
  });

  it("should retrieve a product when a valid ID is provided", async function () {
    // Arrange:
    const validProductId = "66e4dafe-120c-4389-9175-0a656f992148";

    const url = `${apiUrl}/${validProductId}`;

    const status = await page.open(url);

    // Act:
    expect(status).to.equal("success");

    const content = await page.property("content");
    const cleanedContent = content.replace(/<[^>]*>/g, "");
    const responseData = JSON.parse(cleanedContent);

    // Assert:
    expect(responseData).to.have.property("id").equal(validProductId);
    expect(responseData).to.have.property("name").to.be.a("string");
  });

  it("should return a 'Product not found' error when an invalid ID is provided", async function () {
    // Arrange:
    const invalidProductId = "22222222-2222-2222-2222-222222222225";

    const url = `${apiUrl}/${invalidProductId}`;

    const status = await page.open(url);

    // Act: Check the status and fetch content
    expect(status).to.equal("success");

    const content = await page.property("content");
    const cleanedContent = content.replace(/<[^>]*>/g, "");
    const response = JSON.parse(cleanedContent);

    // Assert:
    expect(response).to.have.property("error").equal("Product not found");
  });

  it("should return an 'Internal server error' when an error occurs on the server", async function () {
    // Arrange:
    const errorProductId = "123";

    const url = `${apiUrl}/${errorProductId}`;

    const status = await page.open(url);

    // Act:
    expect(status).to.equal("success");

    const content = await page.property("content");
    const cleanedContent = content.replace(/<[^>]*>/g, "");
    const response = JSON.parse(cleanedContent);

    // Assert:
    expect(response).to.have.property("error").equal("Internal server error");
  });
});

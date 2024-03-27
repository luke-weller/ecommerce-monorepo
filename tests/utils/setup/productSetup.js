const chai = require("chai");
const chaiHttp = require("chai-http");
const mockProductData = require("../factories/productFactory");
const { categorySetup, categoryTeardown } = require("../setup/categorySetup");

chai.use(chaiHttp);

const apiUrl = "http://localhost:8080";

const productSetup = async () => {
  const cateogryData = await categorySetup();
  const productData = await mockProductData(cateogryData.id);
  const response = await chai
    .request(apiUrl)
    .post("/products")
    .send(productData);

  if (response.status === 201) {
    return response.body;
  } else {
    throw new Error(`Failed to create product: ${response.status}`);
  }
};

const productTeardown = async (productData) => {
  if (productData.id) {
    try {
      await chai.request(apiUrl).delete(`/products/${productData.id}`);
      // a category is a forign key on the products table and requires cleanup after test runs
      await categoryTeardown(productData.category_id);
    } catch (error) {
      console.error(
        "Error deleting created product or accociated categoryId:",
        error.message
      );
    }
  }
};

module.exports = { productSetup, productTeardown };

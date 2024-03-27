const chai = require("chai");
const chaiHttp = require("chai-http");
const mockProductData = require("../factories/productFactory");

chai.use(chaiHttp);

const apiUrl = "http://localhost:8080";

const productSetup = async () => {
  const productData = await mockProductData();
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

const productTeardown = async (productId) => {
  if (productId) {
    try {
      await chai.request(apiUrl).delete(`/products/${productId}`);
    } catch (error) {
      console.error("Error deleting created product:", error.message);
    }
  }
};

module.exports = { productSetup, productTeardown };

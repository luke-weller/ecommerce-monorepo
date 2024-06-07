const chai = require("chai");
const chaiHttp = require("chai-http");
const mockCategoryData = require("../factories/categoryFactory");

chai.use(chaiHttp);

const apiUrl = "http://localhost:8080";

const categorySetup = async () => {
  const response = await chai
    .request(apiUrl)
    .post("/category")
    .send(mockCategoryData());

  if (response.status === 201) {
    return response.body;
  } else {
    throw new Error(`Failed to create category: ${response.status}`);
  }
};

const categoryTeardown = async (categoryId) => {
  if (categoryId) {
    try {
      await chai.request(apiUrl).delete(`/category/${categoryId}`);
    } catch (error) {
      console.error("Error deleting created category:", error.message);
    }
  }
};

module.exports = { categorySetup, categoryTeardown };

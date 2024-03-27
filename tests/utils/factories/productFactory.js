const chai = require("chai");
const chaiHttp = require("chai-http");
const { faker } = require("@faker-js/faker");

chai.use(chaiHttp);

const apiUrl = "http://localhost:8080";

const mockProductData = async (categoryId) => {
  return {
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    description: faker.lorem.sentence(),
    category_id: categoryId,
    stock_quantity: faker.number.int({ min: 1, max: 100 }),
  };
};

module.exports = mockProductData;

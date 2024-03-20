const chai = require("chai");
const chaiHttp = require("chai-http");
const { faker } = require("@faker-js/faker");

chai.use(chaiHttp);

const apiUrl = "http://localhost:8080";

const generateProduct = async () => {
  const categoryResponse = await chai.request(apiUrl).post("/category").send({
    name: faker.commerce.department(),
    description: faker.lorem.sentence(),
  });
  const category_id = categoryResponse.body.id;

  return {
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    description: faker.lorem.sentence(),
    category_id: category_id,
    stock_quantity: faker.number.int({ min: 1, max: 100 }),
  };
};

module.exports = generateProduct;

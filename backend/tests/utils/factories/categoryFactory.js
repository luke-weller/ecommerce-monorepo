const { faker } = require("@faker-js/faker");

const generateCategory = () => {
  return {
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
  };
};

module.exports = generateCategory;

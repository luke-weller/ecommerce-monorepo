const { faker } = require("@faker-js/faker");

const mockUserData = () => {
  return {
    email: faker.internet.email(),
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    password: faker.internet.password(),
  };
};

module.exports = mockUserData;

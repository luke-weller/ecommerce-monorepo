const { faker } = require("@faker-js/faker");

const mockCartData = () => {
  return {
    user_id: faker.string.uuid(),
    created_at: faker.date.past(),
    is_empty: true,
    total_price: 0,
  };
};

module.exports = mockCartData;

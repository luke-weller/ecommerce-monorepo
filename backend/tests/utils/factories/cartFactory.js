const { faker } = require("@faker-js/faker");

const mockCartData = (userId) => {
  return {
    user_id: userId,
    created_at: faker.date.past(),
    is_empty: true,
    total_price: 0,
  };
};

module.exports = mockCartData;

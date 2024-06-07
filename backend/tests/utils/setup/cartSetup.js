const chai = require("chai");
const chaiHttp = require("chai-http");
const mockCartData = require("../factories/cartFactory");

chai.use(chaiHttp);

const apiUrl = "http://localhost:8080";

const cartSetup = async (token, userId) => {
  const cartData = mockCartData(userId);
  const response = await chai
    .request(apiUrl)
    .post("/cart")
    .set("Authorization", `Bearer ${token}`)
    .send(cartData);

  if (response.status === 201) {
    return response.body;
  } else {
    throw new Error(`Failed to create cart: ${response.status}`);
  }
};

const cartTeardown = async (cartId, token) => {
  if (cartId) {
    try {
      await chai
        .request(apiUrl)
        .delete(`/cart/${cartId}`)
        .set("Authorization", `Bearer ${token}`);
    } catch (error) {
      console.error("Error deleting created cart:", error.message);
    }
  }
};

module.exports = { cartSetup, cartTeardown };

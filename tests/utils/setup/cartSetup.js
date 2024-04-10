const chai = require("chai");
const chaiHttp = require("chai-http");
const mockCartData = require("../factories/cartFactory");

chai.use(chaiHttp);

const apiUrl = "http://localhost:8080";

const cartSetup = async () => {
  const response = await chai
    .request(apiUrl)
    .post("/cart")
    .send(mockCartData());

  if (response.status === 201) {
    return response.body;
  } else {
    throw new Error(`Failed to create cart: ${response.status}`);
  }
};

const cartTeardown = async (cartId) => {
  if (cartId) {
    try {
      await chai.request(apiUrl).delete(`/cart/${cart}`);
    } catch (error) {
      console.error("Error deleting created cart:", error.message);
    }
  }
};

module.exports = { cartSetup, cartTeardown };

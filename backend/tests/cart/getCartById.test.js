const { userSetup, userTeardown } = require("../utils/setup/userSetup");
const { cartSetup, cartTeardown } = require("../utils/setup/cartSetup");
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;

chai.use(chaiHttp);

const apiUrl = "http://localhost:8080/cart/";

before(async () => {
  createdUser = await userSetup();
  token = createdUser.token;
  createdCart = await cartSetup(token, createdUser.newUser.id);
});

after(async () => {
  await cartTeardown(createdCart.id, token);
  await userTeardown(createdUser.newUser.id);
});

describe("Get cart API", () => {
  it("should return 200 with a valid cart ID", async function () {
    // Act
    const response = await chai.request(apiUrl).get(`${createdCart.id}`);

    // Assert
    expect(response).to.have.status(200);
    expect(response.body).to.be.an("object");
  });

  it("should return the cart with the specified ID with the correct structure and data", async function () {
    // Act
    const response = await chai.request(apiUrl).get(`/${createdCart.id}`);

    // Assert
    expect(response.body).to.have.all.keys([
      "id",
      "user_id",
      "created_at",
      "is_empty",
      "total_price",
    ]);

    expect(response.body).to.deep.include({
      id: createdCart.id,
      user_id: createdCart.user_id,
      created_at: createdCart.created_at,
      is_empty: createdCart.is_empty,
      total_price: createdCart.total_price,
    });
  });

  it("should return 404 if the cart ID does not exist", async function () {
    // Arrange
    const badCartId = "11111111-1111-1111-1111-111111111111";

    // Act
    const response = await chai.request(apiUrl).get(`${badCartId}`);

    // Assert
    expect(response).to.have.status(404);
    expect(response.body).to.be.an("object");
    expect(response.body).to.have.property("error");
    expect(response.body.error).to.equal("Cart not found");
  });

  it("should return 500 if an error occurs on the server", async function () {
    // Arrange
    const errorCartId = "123";

    // Act
    const response = await chai.request(apiUrl).get(`${errorCartId}`);

    // Assert
    expect(response).to.have.status(500);
    expect(response.body).to.be.an("object");
    expect(response.body).to.have.property("error");
    expect(response.body.error).to.equal("Internal server error");
  });
});

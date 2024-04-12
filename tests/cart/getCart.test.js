const { userSetup, userTeardown } = require("../utils/setup/userSetup");
const { cartSetup, cartTeardown } = require("../utils/setup/cartSetup");
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;

chai.use(chaiHttp);

const apiUrl = "http://localhost:8080";

before(async () => {
  createdUser = await userSetup();
  token = createdUser.token;

  createdCart = await cartSetup(token);
});

after(async () => {
  await cartTeardown(createdCart.id, token);
  await userTeardown(createdUser.newUser.id);
});

describe("Get cart API", () => {
  it("should return the cart with the specified ID with the correct status and structure", (done) => {
    // Act
    chai
      .request(apiUrl)
      .get(`/carts/${createdCart.id}`)
      .end((err, res) => {
        // Assert
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        done();
      });
  });

  it("should return the cart with the specified ID with the correct data", (done) => {
    // Act
    chai
      .request(apiUrl)
      .get(`/carts/${createdCart.id}`)
      .end((err, res) => {
        // Assert
        expect(res.body).to.deep.include({
          id: createdCart.id,
          user_id: createdCart.userId,
          created_at: createdCart.createdAt,
          is_empty: createdCart.isEmpty,
          total_price: createdCart.totalPrice,
        });
        done();
      });
  });

  it("should return 404 if the cart ID does not exist", (done) => {
    // Arrange
    const badCartId = "nonexistent-cart-id";

    // Act
    chai
      .request(apiUrl)
      .get(`/carts/${badCartId}`)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("message");
        expect(res.body.message).to.equal("Cart not found");
        done();
      });
  });

  it("should return 401 when the user is not authenticated", (done) => {
    chai
      .request(apiUrl)
      .get(`/carts/${createdCart.id}`)
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });

  it("should return 403 when the user does not have permission to view the cart", (done) => {
    const unauthorizedUserToken = "someUnauthorizedUserToken";
    chai
      .request(apiUrl)
      .get(`/carts/${createdCart.id}`)
      .set("Authorization", `Bearer ${unauthorizedUserToken}`)
      .end((err, res) => {
        expect(res).to.have.status(403);
        done();
      });
  });

  it("should return a cart with the correct structure", (done) => {
    chai
      .request(apiUrl)
      .get(`/carts/${createdCart.id}`)
      .end((err, res) => {
        expect(res.body).to.have.all.keys([
          "id",
          "user_id",
          "created_at",
          "is_empty",
          "total_price",
        ]);
        done();
      });
  });
});

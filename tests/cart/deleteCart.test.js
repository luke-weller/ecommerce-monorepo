const { userSetup, userTeardown } = require("../utils/setup/userSetup");
const { cartSetup, cartTeardown } = require("../utils/setup/cartSetup");
const chai = require("chai");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);
const expect = chai.expect;

const apiUrl = "http://localhost:8080";

describe("delete cart api", () => {
  let token;
  let createdUser;
  let createdCart;

  before(async () => {
    createdUser = await userSetup();
    token = createdUser.token;

    createdCart = await cartSetup(token);
  });

  after(async () => {
    await userTeardown(createdUser.newUser.id);
  });

  it("should delete an existing cart", async () => {
    const response = await chai
      .request(apiUrl)
      .delete(`/cart/${createdCart.id}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response).to.have.status(202);
    expect(response.body).to.be.an("object");
  });
});

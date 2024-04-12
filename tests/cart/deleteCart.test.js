const { userSetup, userTeardown } = require("../utils/setup/userSetup");
const { cartSetup } = require("../utils/setup/cartSetup");
const chai = require("chai");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);
const expect = chai.expect;

const apiUrl = "http://localhost:8080";

let token;
let createdUser;
let createdCart;

before(async () => {
  createdUser = await userSetup();
  token = createdUser.token;

  createdCart = await cartSetup(token, createdUser.newUser.id);
});

after(async () => {
  await userTeardown(createdUser.newUser.id);
});

describe("delete cart api", () => {
  it("should delete an existing cart", async () => {
    const response = await chai
      .request(apiUrl)
      .delete(`/cart/${createdCart.id}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response).to.have.status(202);
    expect(response.body).to.be.an("object");
  });
});

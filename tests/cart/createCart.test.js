const mockCartData = require("../utils/factories/cartFactory");
const { userSetup, userTeardown } = require("../utils/setup/userSetup");
const { cartTeardown } = require("../utils/setup/cartSetup");
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
});

after(async () => {
  await userTeardown(createdUser.newUser.id);
});

after(async () => {
  await cartTeardown(createdCart.id, token);
  await userTeardown(createdUser.newUser.id);
});

describe("createCart", () => {
  it("should create a new cart", async () => {
    cartData = mockCartData();

    const response = await chai
      .request(apiUrl)
      .post("/cart")
      .set("Authorization", `Bearer ${token}`)
      .send(createdCart);

    createdCart = response.body;
    console.log(`Created cart: ${createdCart.id}`);

    expect(response).to.have.status(201);
    expect(response.body).to.be.an("object");
    expect(response.body).to.have.property("id");
  });
});

const mockCartData = require("../utils/factories/cartFactory");
const { userSetup, userTeardown } = require("../utils/setup/userSetup");
const chai = require("chai");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);
const expect = chai.expect;

const apiUrl = "http://localhost:8080";

let token;

before(async () => {
  createdUser = await userSetup();
  token = createdUser.token;
});

after(async () => {
  await userTeardown(createdUser);
});

describe("createCart", () => {
  it("should create a new cart", async () => {
    const cartData = mockCartData();

    const response = await chai
      .request(apiUrl)
      .post("/cart")
      .set("Authorization", `Bearer ${token}`)
      .send(cartData);
    expect(response).to.have.status(201);
    expect(response.body).to.be.an("object");
    expect(response.body).to.have.property("id");
  });
});

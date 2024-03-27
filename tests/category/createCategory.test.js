const mockCategoryData = require("../utils/factories/categoryFactory");
const { categoryTeardown } = require("../utils/setup/categorySetup");

const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;

chai.use(chaiHttp);

const apiUrl = "http://localhost:8080/category";

describe("Create Category API", function () {
  let createdCategoryId;

  after(async function () {
    await categoryTeardown(createdCategoryId);
  });

  it("should create a new category and return it in the response", async function () {
    // Act:
    const categoryData = mockCategoryData();
    const response = await chai.request(apiUrl).post("/").send(categoryData);

    createdCategoryId = response.body.id;

    // Assert:
    expect(response).to.have.status(201);
    expect(response.body).to.be.an("object");
    expect(response.body).to.have.all.keys(["id", "name", "description"]);
    expect(response.body.name).to.equal(categoryData.name);
    expect(response.body.price).to.equal(categoryData.price);
    expect(response.body.description).to.equal(categoryData.description);
    expect(response.body.category_id).to.equal(categoryData.category_id);
    expect(response.body.stock_quantity).to.equal(categoryData.stock_quantity);
  });
});

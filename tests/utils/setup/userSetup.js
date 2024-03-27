const chai = require("chai");
const chaiHttp = require("chai-http");
const mockUserData = require("../factories/userFactory");

chai.use(chaiHttp);

const apiUrl = "http://localhost:8080";

const userSetup = async () => {
  const userData = await mockUserData();
  const response = await chai
    .request(apiUrl)
    .post("/users/register")
    .send(userData);

  if (response.status === 201) {
    return response.body;
  } else {
    throw new Error(`Failed to register user: ${response.status}`);
  }
};

const userTeardown = async (userId) => {
  if (userId) {
    try {
      await chai.request(apiUrl).delete(`/users/${userId}`);
    } catch (error) {
      console.error("Error deleting created user:", error.message);
    }
  }
};

module.exports = { userSetup, userTeardown };

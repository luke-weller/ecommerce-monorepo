const express = require("express");
const router = express.Router();
const createCart = require("../contollers/cartControllers/createCartController");

router.post("/", createCart);

module.exports = router;

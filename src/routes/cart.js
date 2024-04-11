const express = require("express");
const router = express.Router();
const createCart = require("../contollers/cartControllers/createCartController");
const deleteCart = require("../contollers/cartControllers/deleteCartController");

router.post("/", createCart);
router.delete("/:cartId", deleteCart);

module.exports = router;

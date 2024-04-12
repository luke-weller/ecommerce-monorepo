const express = require("express");
const router = express.Router();
const createCart = require("../contollers/cartControllers/createCartController");
const deleteCart = require("../contollers/cartControllers/deleteCartController");
const getCartById = require("../contollers/cartControllers/getCartByIdController");

router.post("/", createCart);
router.delete("/:cartId", deleteCart);
router.get("/:cartId", getCartById);

module.exports = router;

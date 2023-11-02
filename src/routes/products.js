const express = require("express");
const router = express.Router();
const createProduct = require("../contollers/productControllers/createProduct");
const getAllProducts = require("../contollers/productControllers/getAllProducts");
const getProductById = require("../contollers/productControllers/getProductById");
const updateProduct = require("../contollers/productControllers/updateProduct");
const deleteProduct = require("../contollers/productControllers/deleteProduct");

router.get("/", getAllProducts);
router.get("/:productId", getProductById);
router.post("/", createProduct);
router.put("/:productId", updateProduct);
router.delete("/:productId", deleteProduct);

module.exports = router;

const express = require("express");
const router = express.Router();

const createProduct = require("../controllers/productControllers/createProduct");
const getAllProducts = require("../controllers/productControllers/getAllProducts");
const getProductById = require("../controllers/productControllers/getProductById");
const updateProduct = require("../controllers/productControllers/updateProduct");
const deleteProduct = require("../controllers/productControllers/deleteProduct");

router.get("/", getAllProducts);
router.get("/:productId", getProductById);
router.post("/", createProduct);
router.put("/:productId", updateProduct);
router.delete("/:productId", deleteProduct);

module.exports = router;

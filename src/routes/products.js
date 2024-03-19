const express = require("express");
const router = express.Router();
const createProduct = require("../contollers/productControllers/createProductController");
const getAllProducts = require("../contollers/productControllers/getAllProductsController");
const getProductById = require("../contollers/productControllers/getProductByIdController");
const updateProduct = require("../contollers/productControllers/updateProductController");
const deleteProduct = require("../contollers/productControllers/deleteProductController");

router.get("/", getAllProducts);
router.get("/:productId", getProductById);
router.post("/", createProduct);
router.put("/:productId", updateProduct);
router.delete("/:productId", deleteProduct);

module.exports = router;

const express = require("express");
const router = express.Router();
const ProductsController = require("../contollers/productsController");

// product routes
router.get("/", ProductsController.getAllProducts);
router.get("/:productId", ProductsController.getProductById);
router.post("/", ProductsController.createProduct);
router.put("/:productId", ProductsController.updateProduct);
router.delete("/:productId", ProductsController.deleteProduct);

module.exports = router;

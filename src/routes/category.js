const express = require("express");
const router = express.Router();
const createCategory = require("../contollers/categoryControllers/createCategoryController");
const deleteCategory = require("../contollers/categoryControllers/deleteCategoryController");
const updateCategory = require("../contollers/categoryControllers/updateCategoryController");

router.post("/", createCategory);
router.delete("/:categoryId", deleteCategory);
router.put("/:categoryId", updateCategory);

module.exports = router;

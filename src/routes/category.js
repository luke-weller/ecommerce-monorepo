const express = require("express");
const router = express.Router();
const createCategory = require("../contollers/categoryControllers/createCategoryController");
const deleteCategory = require("../contollers/categoryControllers/deleteCategoryController");

router.post("/", createCategory);
router.delete("/:categoryId", deleteCategory);

module.exports = router;

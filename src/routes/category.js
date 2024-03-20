const express = require("express");
const router = express.Router();
const createCategory = require("../contollers/categoryControllers/createCategoryController");

router.post("/", createCategory);

module.exports = router;

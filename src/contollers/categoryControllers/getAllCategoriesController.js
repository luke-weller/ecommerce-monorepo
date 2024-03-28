const Category = require("../../models/category");

async function getAllCategoriesController(req, res) {
  try {
    const categories = await Category.getAllCategories();
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = getAllCategoriesController;

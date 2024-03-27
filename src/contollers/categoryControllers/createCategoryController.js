const Category = require("../../models/category");

async function createCategoryController(req, res) {
  const categoryData = req.body;
  try {
    const newCategory = await Category.createCategory(categoryData);
    res.status(201).json(newCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = createCategoryController;

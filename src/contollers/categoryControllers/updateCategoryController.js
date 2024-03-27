const Category = require("../../models/category");

async function updateCategoryController(req, res) {
  const { categoryId } = req.params;
  const categoryData = req.body;
  try {
    const updatedCategory = await Category.updateCategory(
      categoryId,
      categoryData
    );
    if (!updatedCategory) {
      res.status(404).json({ error: "Category not found" });
    } else {
      res.status(200).json(updatedCategory);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = updateCategoryController;

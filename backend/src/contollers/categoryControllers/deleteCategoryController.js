const Category = require("../../models/category");

async function deleteCategoryController(req, res) {
  const { categoryId } = req.params;
  try {
    const deletedCategory = await Category.deleteCategory(categoryId);
    if (!deletedCategory) {
      res.status(404).json({ error: "Category not found" });
    } else {
      res.status(202).end("Category successfully deleted");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = deleteCategoryController;

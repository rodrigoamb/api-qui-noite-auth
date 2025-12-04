import * as categoryService from "../services/categoryService.js";

export async function getAllCategories(req, res) {
  try {
    const categories = await categoryService.getAllCategories();
    return res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return res.status(500).json({
      message: "Error fetching categories.",
    });
  }
}

export async function getCategoryById(req, res) {
  const { id } = req.params;

  try {
    const category = await categoryService.getCategoryById(id);
    return res.json(category);
  } catch (error) {
    console.error("Error fetching category:", error);

    if (error.message === "Category not found.") {
      return res.status(404).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: "Error fetching category.",
    });
  }
}

export async function getCategoryBySlug(req, res) {
  const { slug } = req.params;

  try {
    const category = await categoryService.getCategoryBySlug(slug);
    return res.json(category);
  } catch (error) {
    console.error("Error fetching category:", error);

    if (error.message === "Category not found.") {
      return res.status(404).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: "Error fetching category.",
    });
  }
}

export async function getAdsByCategory(req, res) {
  const { id } = req.params;

  try {
    const ads = await categoryService.getAdsByCategory(id);
    return res.json(ads);
  } catch (error) {
    console.error("Error fetching ads by category:", error);

    if (error.message === "Category not found.") {
      return res.status(404).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: "Error fetching ads by category.",
    });
  }
}

export async function createCategory(req, res) {
  const { name, description, icon_url, slug } = req.body;

  if (!name || !slug) {
    return res.status(400).json({
      message: "Name and slug are required.",
    });
  }

  try {
    const category = await categoryService.createCategory({
      name,
      description,
      icon_url,
      slug,
    });

    return res.status(201).json({
      message: "Category created successfully!",
      category,
    });
  } catch (error) {
    console.error("Error creating category:", error);

    if (error.message === "Slug already exists.") {
      return res.status(400).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: "Error creating category.",
    });
  }
}

export async function updateCategory(req, res) {
  const { id } = req.params;
  const { name, description, icon_url, slug } = req.body;

  if (!name || !slug) {
    return res.status(400).json({
      message: "Name and slug are required.",
    });
  }

  try {
    const category = await categoryService.updateCategory(id, {
      name,
      description,
      icon_url,
      slug,
    });

    return res.json({
      message: "Category updated successfully!",
      category,
    });
  } catch (error) {
    console.error("Error updating category:", error);

    if (error.message === "Category not found.") {
      return res.status(404).json({
        message: error.message,
      });
    }

    if (error.message === "Slug already exists.") {
      return res.status(400).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: "Error updating category.",
    });
  }
}

export async function deleteCategory(req, res) {
  const { id } = req.params;

  try {
    const result = await categoryService.deleteCategory(id);
    return res.json(result);
  } catch (error) {
    console.error("Error deleting category:", error);

    if (error.message === "Category not found.") {
      return res.status(404).json({
        message: error.message,
      });
    }

    if (error.message === "Cannot delete category with existing ads.") {
      return res.status(400).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: "Error deleting category.",
    });
  }
}

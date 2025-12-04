import * as categoryRepository from "../repositories/categoryRepository.js";
import * as adRepository from "../repositories/adRepository.js";

export async function getAllCategories() {
  return await categoryRepository.findAllCategories();
}

export async function getCategoryById(id) {
  const category = await categoryRepository.findCategoryById(id);
  if (!category) {
    throw new Error("Category not found.");
  }
  return category;
}

export async function getCategoryBySlug(slug) {
  const category = await categoryRepository.findCategoryBySlug(slug);
  if (!category) {
    throw new Error("Category not found.");
  }
  return category;
}

export async function getAdsByCategory(categoryId) {
  const category = await categoryRepository.findCategoryById(categoryId);
  if (!category) {
    throw new Error("Category not found.");
  }

  return await categoryRepository.findAdsByCategory(categoryId);
}

export async function createCategory({ name, description, icon_url, slug }) {
  const existingCategory = await categoryRepository.findCategoryBySlug(slug);
  if (existingCategory) {
    throw new Error("Slug already exists.");
  }

  return await categoryRepository.createCategory({
    name,
    description,
    icon_url,
    slug,
  });
}

export async function updateCategory(id, { name, description, icon_url, slug }) {
  const category = await categoryRepository.findCategoryById(id);
  if (!category) {
    throw new Error("Category not found.");
  }

  if (slug && slug !== category.slug) {
    const existingCategory = await categoryRepository.findCategoryBySlug(slug);
    if (existingCategory) {
      throw new Error("Slug already exists.");
    }
  }

  return await categoryRepository.updateCategory(id, {
    name,
    description,
    icon_url,
    slug,
  });
}

export async function deleteCategory(id) {
  const category = await categoryRepository.findCategoryById(id);
  if (!category) {
    throw new Error("Category not found.");
  }

  const adsCount = await categoryRepository.countAdsByCategory(id);
  if (adsCount > 0) {
    throw new Error("Cannot delete category with existing ads.");
  }

  await categoryRepository.deleteCategory(id);
  return { message: "Category deleted successfully!" };
}

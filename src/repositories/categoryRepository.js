import Category from "../models/categoryModel.js";
import Ad from "../models/adModel.js";

export async function findAllCategories() {
  return await Category.findAll({
    order: [["name", "ASC"]],
  });
}

export async function findCategoryById(id) {
  return await Category.findByPk(id);
}

export async function findCategoryBySlug(slug) {
  return await Category.findOne({ where: { slug } });
}

export async function findAdsByCategory(categoryId) {
  return await Ad.findAll({
    where: { category_id: categoryId },
    order: [["created_at", "DESC"]],
  });
}

export async function createCategory({ name, description, icon_url, slug }) {
  return await Category.create({
    name,
    description,
    icon_url,
    slug,
  });
}

export async function updateCategory(id, { name, description, icon_url, slug }) {
  const category = await Category.findByPk(id);
  if (!category) return null;

  await category.update({ name, description, icon_url, slug });
  return category;
}

export async function deleteCategory(id) {
  const category = await Category.findByPk(id);
  if (!category) return null;

  await category.destroy();
  return category;
}

export async function countAdsByCategory(categoryId) {
  return await Ad.count({
    where: { category_id: categoryId },
  });
}

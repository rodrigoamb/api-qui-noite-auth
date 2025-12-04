import Ad from "../models/adModel.js";
import User from "../models/userModel.js";
import Category from "../models/categoryModel.js";

export async function findAllAds() {
  return await Ad.findAll({
    include: [
      {
        model: User,
        as: "user",
        attributes: ["id", "name", "city", "state"],
      },
      {
        model: Category,
        as: "category",
        attributes: ["id", "name", "slug"],
      },
    ],
    order: [["created_at", "DESC"]],
  });
}

export async function findAdsByUser(userId) {
  return await Ad.findAll({
    where: { user_id: userId },
    include: [
      {
        model: User,
        as: "user",
        attributes: ["id", "name", "phone", "city", "state"],
      },
      {
        model: Category,
        as: "category",
        attributes: ["id", "name", "slug"],
      },
    ],
    order: [["created_at", "DESC"]],
  });
}

export async function findAdById(id) {
  return await Ad.findByPk(id, {
    include: [
      {
        model: User,
        as: "user",
        attributes: ["id", "name", "phone", "city", "state"],
      },
      {
        model: Category,
        as: "category",
        attributes: ["id", "name", "slug", "description"],
      },
    ],
  });
}

export async function createAd({ title, description, price, photo_url, condition, category_id, user_id }) {
  return await Ad.create({
    title,
    description,
    price,
    photo_url,
    condition,
    category_id,
    user_id,
  });
}

export async function updateAd(id, { title, description, price, photo_url, condition, category_id }) {
  const ad = await Ad.findByPk(id);
  if (!ad) return null;

  await ad.update({ title, description, price, photo_url, condition, category_id });
  return ad;
}

export async function deleteAd(id) {
  const ad = await Ad.findByPk(id);
  if (!ad) return null;

  await ad.destroy();
  return ad;
}

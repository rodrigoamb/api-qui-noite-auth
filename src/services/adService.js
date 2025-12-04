import * as adRepository from "../repositories/adRepository.js";
import * as categoryRepository from "../repositories/categoryRepository.js";

export async function getAllAds() {
  return await adRepository.findAllAds();
}

export async function getAdsByUser(userId) {
  return await adRepository.findAdsByUser(userId);
}

export async function getAdById(adId, userId) {
  const ad = await adRepository.findAdById(adId);

  if (!ad) {
    throw new Error("Ad not found.");
  }

  if (ad.user_id !== userId) {
    throw new Error("You do not have permission to access this ad.");
  }

  return ad;
}

export async function createAd({ title, description, price, photo_url, condition, category_id, user_id }) {
  const category = await categoryRepository.findCategoryById(category_id);
  if (!category) {
    throw new Error("Category not found.");
  }

  const ad = await adRepository.createAd({
    title,
    description,
    price,
    photo_url,
    condition,
    category_id,
    user_id,
  });

  return ad;
}

export async function updateAd(adId, { title, description, price, photo_url, condition, category_id }, userId) {
  const existingAd = await adRepository.findAdById(adId);

  if (!existingAd) {
    throw new Error("Ad not found.");
  }

  if (existingAd.user_id !== userId) {
    throw new Error("You do not have permission to edit this ad.");
  }

  const category = await categoryRepository.findCategoryById(category_id);
  if (!category) {
    throw new Error("Category not found.");
  }

  const ad = await adRepository.updateAd(adId, {
    title,
    description,
    price,
    photo_url,
    condition,
    category_id,
  });

  return ad;
}

export async function deleteAd(adId, userId) {
  const existingAd = await adRepository.findAdById(adId);

  if (!existingAd) {
    throw new Error("Ad not found.");
  }

  if (existingAd.user_id !== userId) {
    throw new Error("You do not have permission to delete this ad.");
  }

  await adRepository.deleteAd(adId);
  return { message: "Ad deleted successfully!" };
}

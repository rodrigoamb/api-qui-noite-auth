import User from "../models/userModel.js";
import Ad from "../models/adModel.js";

export async function findUserById(id) {
  return await User.findByPk(id, {
    attributes: { exclude: ["password"] },
  });
}

export async function updateUserProfile(id, { name, phone, city, state, bio, avatar_url }) {
  const user = await User.findByPk(id);
  if (!user) return null;

  await user.update({ name, phone, city, state, bio, avatar_url });

  return await User.findByPk(id, {
    attributes: { exclude: ["password"] },
  });
}

export async function countUserAds(userId) {
  return await Ad.count({
    where: { user_id: userId },
  });
}

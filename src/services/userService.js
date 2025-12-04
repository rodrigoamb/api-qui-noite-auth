import * as userRepository from "../repositories/userRepository.js";

export async function getUserProfile(userId) {
  const user = await userRepository.findUserById(userId);
  if (!user) {
    throw new Error("User not found.");
  }

  const adsCount = await userRepository.countUserAds(userId);

  return {
    id: user.id,
    name: user.name,
    city: user.city,
    state: user.state,
    avatar_url: user.avatar_url,
    bio: user.bio,
    rating: user.rating,
    total_ratings: user.total_ratings,
    verified: user.verified,
    member_since: user.created_at,
    ads_count: adsCount,
  };
}

export async function getMyProfile(userId) {
  const user = await userRepository.findUserById(userId);
  if (!user) {
    throw new Error("User not found.");
  }

  return user;
}

export async function updateMyProfile(userId, { name, phone, city, state, bio, avatar_url }) {
  const user = await userRepository.findUserById(userId);
  if (!user) {
    throw new Error("User not found.");
  }

  return await userRepository.updateUserProfile(userId, {
    name,
    phone,
    city,
    state,
    bio,
    avatar_url,
  });
}

export async function getUserStats(userId) {
  const user = await userRepository.findUserById(userId);
  if (!user) {
    throw new Error("User not found.");
  }

  const adsCount = await userRepository.countUserAds(userId);

  return {
    total_ads: adsCount,
    rating: user.rating,
    total_ratings: user.total_ratings,
    verified: user.verified,
    member_since: user.created_at,
  };
}
